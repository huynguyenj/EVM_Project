import { ApiResponseProperty } from '@nestjs/swagger';
import { WarehouseResponseDto } from 'src/admin/warehouses/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

export class InventoryDetailResponseDto {
  @ApiResponseProperty({ example: 1 })
  motorbikeId: number;
  @ApiResponseProperty({ example: 1 })
  warehouseId: number;
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
  @ApiResponseProperty({ type: WarehouseResponseDto })
  warehouse: WarehouseResponseDto;

  @ApiResponseProperty({ type: MotorbikeResponseDto })
  motorbike: MotorbikeResponseDto;
}
