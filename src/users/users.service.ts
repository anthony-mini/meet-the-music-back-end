import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { role } = createUserDto;
    const allowedRoles = ['artist', 'promoter', 'user'];

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenException('You are not allowed to create this role');
    }

    try {
      const salt = +process.env.HASH_SALT;
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      return this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });
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
