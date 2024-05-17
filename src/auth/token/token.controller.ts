import {
  Controller,
  Get,
  Post,
  Headers,
  UnauthorizedException,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../../users/users.service';

import { config } from 'dotenv';

import { Response, Request } from 'express';

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
  async signIn(
    @Headers('Authorization') auth: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const args = auth && auth.split(' ');
    if (args && args.length == 2 && args[0] == 'Basic') {
      const credentials = Buffer.from(args[1], 'base64')
        .toString('utf8')
        .split(':');
      const email = credentials[0];
      const password = credentials[1];
      const user = await this.usersServices.findByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = this.jwtService.sign(
          {
            id: user.id,
            role: user.role,
          },
          {
            subject: email,
            expiresIn: '1h',
          },
        );

        response.cookie('access_token', token, {
          domain: 'meetthemusic.fr', // 'localhost' or 'meetthemusic.fr
          httpOnly: false, // true if in production or staging
          secure: false, // true if in production or staging
          maxAge: 3600000, // 1 heure
          sameSite: 'lax',
        });

        const signInData = new SignInDto();
        signInData.expires_in = 3600;
        signInData.access_token = token;
        return signInData;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }

  @Get('me')
  async getUserInformation(@Req() request: Request) {
    // Retrieving the token from cookies passed in the request header
    const token = request.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }

    try {
      const data = this.jwtService.verify(token);
      const user = await this.usersServices.findOne(data.id);
      return {
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        initial: (user.firstName[0] + user.lastName[0]).toUpperCase(),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '', {
      domain: 'meetthemusic.fr', // 'localhost' or 'meetthemusic.fr
      httpOnly: false, // true if in production or staging
      secure: false, // true if in production or staging
      expires: new Date(0), // Expire immédiatement
      sameSite: 'lax',
    });
    return { message: 'Logged out successfully' };
  }
}
