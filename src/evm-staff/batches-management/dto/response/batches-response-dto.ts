import { ApiResponseProperty } from '@nestjs/swagger';
import { BatchesStatus } from '../../types';

export class ApBatchesResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 150000 })
  amount: number;

  @ApiResponseProperty({ example: BatchesStatus.OPEN })
  status: BatchesStatus;

  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  createAt: Date;
}
