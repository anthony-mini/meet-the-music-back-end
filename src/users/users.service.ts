import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
