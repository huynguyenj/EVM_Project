import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const StaffQueries = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, role } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      role,
    };
  },
);
