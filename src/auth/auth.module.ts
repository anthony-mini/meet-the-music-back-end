import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TokenController],
  providers: [UsersService],
})
export class AuthModule {}
