import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, orderName, orderType, filter } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      orderName,
      orderType,
      filter,
    };
  },
);
