import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { OrderStatus } from '../../types';
import { OrderBillResponseDto } from './order-bill-response';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { DiscountResponseDto } from 'src/policy/discount/dto';
import { WarehouseResponseDto } from 'src/admin/warehouses/dto';

class MotorbikeDto extends PickType(MotorbikeResponseDto, [
  'name',
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

export class OrderDetailResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 10 })
  quantity: number;

  @ApiResponseProperty({ example: 150000 })
  basePrice: number;

  @ApiResponseProperty({ example: 145000 })
  wholeSalePrice: number;

  @ApiResponseProperty({ example: 7250 })
  discountTotal: number;

  @ApiResponseProperty({ example: 10250 })
  promotionTotal: number;

  @ApiResponseProperty({ example: 127600 })
  finalPrice: number;

  @ApiResponseProperty({ example: 1276000 })
  subTotal: number;

  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  orderAt: Date;

  @ApiResponseProperty({ example: OrderStatus.DRAFT })
  status: OrderStatus;

  @ApiResponseProperty({ type: OrderBillResponseDto })
  agencyBill: OrderBillResponseDto;

  @ApiResponseProperty({ type: DiscountDto })
  discountPolicy: DiscountDto;

  @ApiResponseProperty({ type: PromotionDto })
  promotion: PromotionDto;

  @ApiResponseProperty({ type: MotorbikeDto })
  electricMotorbike: MotorbikeDto;

  @ApiResponseProperty({ type: WarehouseResponseDto })
  warehouse: WarehouseResponseDto;
}
