import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => 'hashedPassword'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let userRepository;

  beforeEach(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue('user'),
      save: jest.fn().mockResolvedValue('user'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  xit('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('should create a user', async () => {
    const userDto: CreateUserDto = {
      email: 'test@test.com',
      password: 'Password1*', // Mot de passe modifié pour respecter les règles
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      address: 'Rue de pottier',
      role: Role.USER,
    };

    const user = new User();
    Object.assign(user, userDto, { password: 'hashedPassword' });

    expect(await service.create(userDto)).toEqual(user);
    expect(userRepository.save).toHaveBeenCalledWith(user);
    expect(bcrypt.hash).toHaveBeenCalledWith(
      userDto.password,
      expect.any(Number),
    );
  });

  xit('should update a password', async () => {
    const updateUserDto = {
      id: 1,
      email: 'example@email.fr',
      password: 'NewPassPassword12!', // Mot de passe modifié pour respecter les règles
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      role: Role.USER,
    };
    const id = 1;
    const user = new User();
    Object.assign(user, updateUserDto, { password: 'hashedPassword' });

    userRepository.findOne = jest.fn().mockResolvedValue(user);
    userRepository.update = jest.fn().mockResolvedValue(user);
    // bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    expect(await service.update(id, updateUserDto)).toEqual(user);
    expect(bcrypt.hash).toHaveBeenCalledWith(
      updateUserDto.password,
      expect.any(Number),
    );

    expect(userRepository.update).toHaveBeenCalledWith(id, user);
  });

  xit('should return all users', async () => {
    expect(await service.findAll()).toBe('user');
    expect(userRepository.find).toHaveBeenCalled();
  });

  xit('should return a user by email', async () => {
    const testEmail = 'test@test.com';
    const user = {
      email: testEmail,
    };

    userRepository.findOneBy = jest.fn().mockResolvedValue(user);

    const result = await service.findByEmail(testEmail);

    expect(result).toEqual(user);
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: testEmail });
  });
});
