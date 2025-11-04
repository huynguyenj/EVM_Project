import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QuarterAgencyContractReportQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { quarter, year, agencyId } = request.query;
    return {
      agencyId,
      quarter,
      year,
    };
  },
);
