import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {
  generateAlias,
  ensureAliasIsUnique,
  createUserProfile,
} from '../common/helpers/users.helpers';
import { ArtistProfile } from '../artist-profile/entities/artist-profile.entity';
import { EstablishmentProfile } from '../establishment-profile/entities/establishment-profile.entity';
import { SocialMedia } from '../social-media/entites/social-media.entity';
import { Role } from './enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ArtistProfile)
    private artistProfileRepository: Repository<ArtistProfile>,
    @InjectRepository(EstablishmentProfile)
    private establishmentProfileRepository: Repository<EstablishmentProfile>,
    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

    const { role, password, firstName, lastName } = createUserDto;
    const allowedRoles = ['artist', 'promoter', 'user'];

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenException('You are not allowed to create this role');
    }

    if (!regex.test(password)) {
      throw new BadRequestException(
        '8 characters, 1 capital letter, 1 minimum number.',
      );
    }

    try {
      const salt = +process.env.HASH_SALT;
      const hashedPassword = await bcrypt.hash(password, salt);

      let alias = generateAlias(firstName, lastName);
      alias = await ensureAliasIsUnique(alias, async (alias) => {
        const user = await this.userRepository.findOne({ where: { alias } });
        return !!user;
      });

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        alias,
      });

      const savedUser = await this.userRepository.save(newUser);

      const user = await this.userRepository.findOne({
        where: { id: savedUser.id },
      });

      await createUserProfile(
        user,
        this.artistProfileRepository,
        this.establishmentProfileRepository,
        this.socialMediaRepository,
      );

      return savedUser;
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async findAll(limit: number): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        take: limit,
      });
      return users;
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async searchUsersAndEstablishment(
    search: string,
  ): Promise<Record<string, any>> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.artistProfile', 'artistProfile')
        .leftJoinAndSelect('user.establishmentProfile', 'establishmentProfile')
        .where(
          '(user.firstName ILIKE :search OR user.lastName ILIKE :search) AND user.role = :role',
          {
            search: `%${search}%`,
            role: 'artist',
          },
        )
        .orWhere('user.alias ILIKE :search AND user.role = :role', {
          search: `%${search}%`,
          role: 'artist',
        })
        .orWhere('establishmentProfile.name ILIKE :search', {
          search: `%${search}%`,
        })
        .getMany();

      return users.map((user) => {
        if (user.role === 'artist') {
          return {
            artistProfile: {
              user: {
                alias: user.alias,
                firstName: user.firstName,
                lastName: user.lastName,
                zipCode: user.zipCode,
                city: user.city,
                role: user.role,
              },
            },
          };
        } else if (user.role === 'promoter') {
          return {
            establishmentProfile: {
              name: user.establishmentProfile.name,
              user: {
                alias: user.alias,
                firstName: user.firstName,
                lastName: user.lastName,
                zipCode: user.zipCode,
                city: user.city,
                role: user.role,
              },
            },
          };
        }
      });
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async getArtistUsers(limit: number): Promise<User[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('user.role = :role', { role: Role.ARTIST })
        .andWhere('user.status = :status', { status: 'active' })
        .take(limit)
        .getMany();

      return users;
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async findOne(id): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const salt = +process.env.HASH_SALT;
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      await this.userRepository.update(id, {
        ...updateUserDto,
        password: hashedPassword,
      });

      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new ConflictException(error.message, error.detail);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const done = await this.userRepository.delete(id);

    if (done.affected != 1)
      throw new NotFoundException(`User #${id} not found`);

    return { message: 'User deleted successfully' };
  }
}
