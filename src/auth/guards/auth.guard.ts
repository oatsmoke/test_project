import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET,
        });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
