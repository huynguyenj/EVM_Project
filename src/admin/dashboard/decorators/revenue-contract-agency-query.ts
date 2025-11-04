import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AgencyContractReportQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { agencyId } = request.query;
    return {
      agencyId,
    };
  },
);
