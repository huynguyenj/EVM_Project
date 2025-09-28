import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      throw new UnauthorizedException('Missing token in request!');
    const token = authHeader?.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      req['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired!');
    }
  }
}
