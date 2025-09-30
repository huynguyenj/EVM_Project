import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import authConfig from 'src/config/auth.config';
import { AuthenticationRequest } from '../types/request.extend.type';
import { JwtPayload } from '../types/jwt.payload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticationRequest>();
    const authHeader = req.headers['authorization'];
    const isPublic = this.reflector.get<boolean>(
      'public',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    if (!authHeader)
      throw new UnauthorizedException('Missing token in request!');
    const token = authHeader?.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.authSettings.jwtSecret,
      });
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired!');
    }
  }
}
