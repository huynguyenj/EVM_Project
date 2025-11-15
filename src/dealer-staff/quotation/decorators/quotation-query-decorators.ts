import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QuotationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit, type, status, quoteCode, customerId, sort } =
      request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      quoteCode,
      type,
      status,
      customerId,
      sort: sort ? sort : 'newest',
    };
  },
);
