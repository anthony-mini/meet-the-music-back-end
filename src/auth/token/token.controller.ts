import {
  ConflictException,
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth/token')
export class TokenController {
  constructor(private usersServices: UsersService) {}

  @Get()
  async signIn(@Headers('Authorization') auth: string) {
    try {
      const args = auth && auth.split(' ');
      if (args && args.length == 2 && args[0] == 'Basic') {
        const credentials = Buffer.from(args[1], 'base64')
          .toString('utf8')
          .split(':');
        const email = credentials[0];
        const password = credentials[1];
        const user = await this.usersServices.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
          return 'token';
        } else {
          throw new UnauthorizedException('Invalid credentials');
        }
      }
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
