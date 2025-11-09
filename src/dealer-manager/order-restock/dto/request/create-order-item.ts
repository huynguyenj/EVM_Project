import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderItemDetailDto {
  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  discountTotal: number;

  @IsNotEmpty()
  @IsNumber()
  promotionTotal: number;

  @IsNotEmpty()
  @IsNumber()
  finalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  wholesalePrice: number;

  @IsNotEmpty()
  @IsNumber()
  electricMotorbikeId: number;

  @IsNotEmpty()
  @IsNumber()
  colorId: number;

  @IsOptional()
  @IsNumber()
  promotionId: number;

  @IsOptional()
  @IsNumber()
  discountId: number;

  @IsOptional()
  @IsNumber()
  pricePolicyId: number;

  @IsNotEmpty()
  @IsNumber()
  warehouseId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
