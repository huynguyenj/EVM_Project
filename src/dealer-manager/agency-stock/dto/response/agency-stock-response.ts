import { ApiResponseProperty } from '@nestjs/swagger';

export class AgencyStockResponse {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 10 })
  quantity: number;

  @ApiResponseProperty({ example: 155000 })
  price: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    format: 'date-time',
  })
  createAt: Date;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    format: 'date-time',
  })
  updateAt: Date;
}
