import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorators';
import { Role } from '../types/role.enum';
import { AuthenticationRequest } from '../types/request.extend.type';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflect: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const currentTransferMethod = context.switchToHttp();
    const request = currentTransferMethod.getRequest<AuthenticationRequest>();
    const requiredRoles = this.reflect.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const userRoles = request.user?.roles;
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
