import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AdminQueries = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, role, sort } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      role,
      sort: sort ? sort : 'newest',
    };
  },
);
