import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Extract roles defined on controllers
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) {
      return false;
    }

    // Extract JWT payload from request
    const request = context.switchToHttp().getRequest();
    if (request instanceof IncomingMessage) {
      const auth = request.headers.authorization;
      const args = auth && auth.split(' ');
      if (args && args.length == 2 && args[0] == 'Bearer') {
        const token = args[1];
        const jwts = new JwtService({ secret: process.env.JWT_SECRET });
        const payload = jwts.decode(token) as [key: string];
        const role = payload['role'];
        return roles.includes(role);
      }
    }
    return false;
  }
}
