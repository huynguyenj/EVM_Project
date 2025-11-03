import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { DiscountResponseDto } from 'src/policy/discount/dto';
import { WarehouseResponseDto } from 'src/admin/warehouses/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { OrderItemResponse } from './order-item-response';

class MotorbikeDto extends PickType(MotorbikeResponseDto, [
  'id',
  'name',
] as const) {}
class DiscountDto extends PickType(DiscountResponseDto, [
  'id',
  'name',
  'type',
  'value_type',
  'value',
] as const) {}
class PromotionDto extends PickType(DiscountResponseDto, [
  'id',
  'name',
  'value_type',
  'value',
] as const) {}

export class OrderItemDetailResponseDto extends OrderItemResponse {
  @ApiResponseProperty({ type: DiscountDto })
  discountPolicy: DiscountDto;

  @ApiResponseProperty({ type: PromotionDto })
  promotion: PromotionDto;

  @ApiResponseProperty({ type: MotorbikeDto })
  electricMotorbike: MotorbikeDto;

  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;

  @ApiResponseProperty({ type: WarehouseResponseDto })
  warehouse: WarehouseResponseDto;
}
