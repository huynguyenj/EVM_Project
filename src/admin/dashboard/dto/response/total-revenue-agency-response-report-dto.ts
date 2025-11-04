import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalRevenueAgencyContractResponseDto {
  @ApiResponseProperty({ example: 150000 })
  totalContractRevenue: number;
}
