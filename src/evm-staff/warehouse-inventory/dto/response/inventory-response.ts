import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

class InventoryMotorbikeNameResponseDto extends PickType(MotorbikeResponseDto, [
  'name',
] as const) {}
class InventoryColorTypeResponseDto extends PickType(ColorResponseDto, [
  'colorType',
] as const) {}
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

  @ApiResponseProperty({ type: InventoryMotorbikeNameResponseDto })
  electricMotorbike: InventoryMotorbikeNameResponseDto;

  @ApiResponseProperty({ type: InventoryColorTypeResponseDto })
  color: InventoryColorTypeResponseDto;
}
