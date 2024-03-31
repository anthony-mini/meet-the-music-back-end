import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      role: Role.USER,
    };
    service.create = jest.fn().mockResolvedValue('user');
    expect(await controller.create(dto)).toBe('user');
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    service.findAll = jest.fn().mockResolvedValue(['user1', 'user2']);
    expect(await controller.findAll()).toEqual(['user1', 'user2']);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const id = '1';
    service.findOne = jest.fn().mockResolvedValue('user');
    expect(await controller.findOne(id)).toBe('user');
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should find user by email', async () => {
    const email = 'test@test.com';
    service.findByEmail = jest.fn().mockResolvedValue('user');
    expect(await controller.findByEmail(email)).toBe('user');
    expect(service.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should update a user', async () => {
    const id = '1';
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '1234567890',
      role: Role.USER,
    };
    service.update = jest.fn().mockResolvedValue('user');
    expect(await controller.update(id, dto)).toBe('user');
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove a user', async () => {
    const id = '1';
    service.remove = jest.fn().mockResolvedValue('user');
    expect(await controller.remove(id)).toBe('user');
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
