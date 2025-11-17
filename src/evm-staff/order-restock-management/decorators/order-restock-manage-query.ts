import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const OrderStockManageQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, status, agencyId, sort } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      status,
      agencyId,
      sort: sort ? sort : 'newest',
    };
  },
);
