import { ApiResponseProperty } from '@nestjs/swagger';
import { DepositStatus } from '../../types';

export class DepositResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 10 })
  depositPercent: number;
  @ApiResponseProperty({ example: 5000 })
  depositAmount: number;
  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  holdDay: Date;
  @ApiResponseProperty({ example: DepositStatus.PENDING })
  status: DepositStatus;
  @ApiResponseProperty({ example: 1 })
  quotationId: number;
}
