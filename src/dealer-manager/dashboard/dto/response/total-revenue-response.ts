import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalRevenueAgencyResponse {
  @ApiResponseProperty({ example: 100000 })
  totalRevenue: number;
}
