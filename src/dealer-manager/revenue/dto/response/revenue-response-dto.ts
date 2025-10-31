import { ApiResponseProperty } from '@nestjs/swagger';

export class RevenueResponse {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 15000 })
  total: number;

  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  createAt: Date;

  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  updateAt: Date;
}
