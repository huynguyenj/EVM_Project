import { ApiResponseProperty } from '@nestjs/swagger';

export class ContractDataChartResponse {
  @ApiResponseProperty({ example: 1 })
  month: number;
  @ApiResponseProperty({ example: 10 })
  totalContractCompleted: number;
  @ApiResponseProperty({ example: 15 })
  totalContractDelivered: number;
  @ApiResponseProperty({ example: 11 })
  totalContractPending: number;
}
