import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { audience: process.env.JWT_AUDIENCE },
    }),
  ],
  controllers: [TokenController],
  providers: [UsersService],
})
export class AuthModule {}
