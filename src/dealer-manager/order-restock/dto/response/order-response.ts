import { ApiResponseProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../types';

export class OrderResponseDto {
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
}
