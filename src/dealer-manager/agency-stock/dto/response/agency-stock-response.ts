import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

class AgencyStockMotorbikeNameResponse extends PickType(MotorbikeResponseDto, [
  'name',
] as const) {}
class AgencyStockColorTypeResponse extends PickType(ColorResponseDto, [
  'colorType',
] as const) {}
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

  @ApiResponseProperty({ type: AgencyStockMotorbikeNameResponse })
  motorbike: AgencyStockMotorbikeNameResponse;

  @ApiResponseProperty({ type: AgencyStockColorTypeResponse })
  color: AgencyStockColorTypeResponse;
}
