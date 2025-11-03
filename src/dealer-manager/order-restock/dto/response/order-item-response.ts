import { ApiResponseProperty } from '@nestjs/swagger';

export class OrderItemResponse {
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

  @ApiResponseProperty({ example: 1 })
  discountId: number;

  @ApiResponseProperty({ example: 1 })
  promotionId: number;

  @ApiResponseProperty({ example: 1 })
  electricMotorbikeId: number;

  @ApiResponseProperty({ example: 1 })
  colorId: number;

  @ApiResponseProperty({ example: 1 })
  warehouseId: number;

  @ApiResponseProperty({ example: 1 })
  pricePolicyId: number;

  @ApiResponseProperty({ example: 1 })
  orderId: number;
}
