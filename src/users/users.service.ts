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
} from '../common/helpers/users.helpers';
import { ArtistProfile } from '../artist-profile/entities/artist-profile.entity';
import { EstablishmentProfile } from '../establishment-profile/entities/establishment-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ArtistProfile)
    private artistProfileRepository: Repository<ArtistProfile>,
    @InjectRepository(EstablishmentProfile)
    private establishmentProfileRepository: Repository<EstablishmentProfile>,
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

      if (user.role === 'artist') {
        const artistProfile = this.artistProfileRepository.create({
          user: user,
        });

        await this.artistProfileRepository.save(artistProfile);
      } else if (user.role === 'promoter') {
        const establishmentProfile = this.establishmentProfileRepository.create(
          {
            user: user,
          },
        );

        await this.establishmentProfileRepository.save(establishmentProfile);
      }
      return savedUser;
    } catch (error) {
      throw new ConflictException(error.message, error.detail);
    }
  }

  async findAll(): Promise<Record<string, any>[]> {
    try {
      const users = await this.userRepository.find();
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
