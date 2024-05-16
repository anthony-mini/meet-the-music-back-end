import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../../users/users.service';
import { RolesGuard } from '../security/roles.guard';
import { Role } from '../../users/enums/role.enum';
import { Roles } from '../security/roles.decorator';

import { config } from 'dotenv';

config();

@Controller('auth/token')
@UseGuards(ThrottlerGuard) // Limit the number of requests globally
export class TokenController {
  constructor(
    private usersServices: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Throttle({ default: { limit: 5, ttl: 300 } })
  async signIn(@Headers('Authorization') auth: string) {
    const args = auth && auth.split(' ');
    if (args && args.length == 2 && args[0] == 'Basic') {
      const credentials = Buffer.from(args[1], 'base64')
        .toString('utf8')
        .split(':');
      const email = credentials[0];
      const password = credentials[1];
      const user = await this.usersServices.findByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        const signInData = new SignInDto();
        signInData.expires_in = 3600;
        signInData.access_token = this.jwtService.sign(
          {
            id: user.id,
            role: user.role,
          },
          {
            subject: email,
            expiresIn: '1h',
          },
        );
        return signInData;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.ARTIST, Role.PROMOTER)
  @Get('me')
  async getUserInformation(@Headers('Authorization') auth: string) {
    const args = auth && auth.split(' ');
    if (args && args.length == 2 && args[0] == 'Bearer') {
      const token = args[1];
      const data = this.jwtService.verify(token);
      const user = await this.usersServices.findOne(data.id);
      return {
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        initial: (user.firstName[0] + user.lastName[0]).toUpperCase(),
      };
    }
  }
}
