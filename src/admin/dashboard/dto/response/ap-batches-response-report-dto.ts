import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalApBatchResponse {
  @ApiResponseProperty({ example: 5 })
  totalApBatches: number;
}
