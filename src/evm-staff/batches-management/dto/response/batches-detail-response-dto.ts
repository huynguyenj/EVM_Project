import { ApiResponseProperty } from '@nestjs/swagger';
import { ApBatchesResponseDto } from './batches-response-dto';

class BatchesPaymentsDto {
  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  paidDate: number;
  @ApiResponseProperty({ example: 5000 })
  amount: number;
}

export class BatchesDetailResponse extends ApBatchesResponseDto {
  @ApiResponseProperty({ type: [BatchesPaymentsDto] })
  apPayment: BatchesPaymentsDto[];
}
