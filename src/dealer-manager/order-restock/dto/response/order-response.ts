import { ApiResponseProperty } from '@nestjs/swagger';
import { AgencyOrderType, OrderStatus } from '../../types';
import { OrderItemResponse } from './order-item-response';

export class OrderResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 10 })
  itemsQuantity: number;

  @ApiResponseProperty({ example: 1276000 })
  subTotal: number;

  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  orderAt: Date;

  @ApiResponseProperty({ example: AgencyOrderType.FULL })
  orderType: AgencyOrderType;

  @ApiResponseProperty({ example: OrderStatus.DRAFT })
  status: OrderStatus;

  @ApiResponseProperty({ type: [OrderItemResponse] })
  orderItems: OrderItemResponse[];
}
