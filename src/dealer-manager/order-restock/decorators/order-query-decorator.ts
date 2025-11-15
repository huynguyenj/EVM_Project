import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const OrderStockQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, status, sort } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      status,
      sort: sort ? sort : 'newest',
    };
  },
);
