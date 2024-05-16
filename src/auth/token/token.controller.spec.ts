import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';

describe('TokenController', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 600, // seconds (10 minutes)
            limit: 100, // limit requests
          },
        ]),
      ],
      controllers: [TokenController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockImplementation(() => {}),
          },
        },
      ],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
