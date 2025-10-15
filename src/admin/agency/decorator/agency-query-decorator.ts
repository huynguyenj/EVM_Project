import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AgencyQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { limit, page, location, address } = request.query;
    return {
      page: page ? +page : 1,
      limit: limit ? +limit : 5,
      location,
      address,
    };
  },
);
