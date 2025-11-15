import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const DriveTrailQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, email, phone, fullname, status, sort } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      email,
      fullname,
      phone,
      status,
      sort: sort ? sort : 'newest',
    };
  },
);
