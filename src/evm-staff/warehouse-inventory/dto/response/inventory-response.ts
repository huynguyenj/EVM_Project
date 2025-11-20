import { ApiResponseProperty } from '@nestjs/swagger';

export class InventoryResponseDto {
  @ApiResponseProperty({ example: 1 })
  electricMotorbikeId: number;
  @ApiResponseProperty({ example: 1 })
  warehouseId: number;
  @ApiResponseProperty({ example: 1 })
  colorId: number;
  @ApiResponseProperty({ example: 100 })
  quantity: number;
  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
  })
  stockDate: Date;
  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
  })
  lastUpdate: Date;
}
