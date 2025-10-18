import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';

export class UpdateOrderStock {
  @ApiProperty({ example: OrderStatus.APPROVED })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
