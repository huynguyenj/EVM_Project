import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticationRequest } from 'src/auth/types/request.extend.type';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticationRequest>();
    return request.user.userId;
  },
);
