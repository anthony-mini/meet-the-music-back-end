import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let userRepository;
  beforeEach(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue('user'),
      save: jest.fn().mockResolvedValue('user'),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 600, // seconds (10 minutes)
            limit: 100, // limit requests
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });

  xit('should create a user', async () => {
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'Password12!',
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      address: 'Rue de pottier',
      zipCode: '75000',
      city: 'Paris',
      role: Role.USER,
    };
    service.create = jest.fn().mockResolvedValue('user');
    expect(await controller.create(dto)).toBe('user');
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  xit('should find all users', async () => {
    service.findAll = jest.fn().mockResolvedValue(['user1', 'user2']);
    expect(await controller.findAll()).toEqual(['user1', 'user2']);
    expect(service.findAll).toHaveBeenCalled();
  });

  xit('should find one user', async () => {
    const id = '1';
    service.findOne = jest.fn().mockResolvedValue('user');
    expect(await controller.findOne(id)).toBe('user');
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  xit('should find user by email', async () => {
    const email = 'test@test.com';
    service.findByEmail = jest.fn().mockResolvedValue('user');
    expect(await controller.findByEmail(email)).toBe('user');
    expect(service.findByEmail).toHaveBeenCalledWith(email);
  });

  xit('should update a user', async () => {
    const id = '1';
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'Password12!',
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      address: 'Rue de pottier',
      zipCode: '75000',
      city: 'Paris',
      role: Role.USER,
    };
    service.update = jest.fn().mockResolvedValue('user');
    expect(await controller.update(id, dto)).toBe('user');
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  xit('should remove a user', async () => {
    const id = '1';
    service.remove = jest.fn().mockResolvedValue('user');
    expect(await controller.remove(id)).toBe('user');
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
