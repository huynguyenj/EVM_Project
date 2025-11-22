import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';

export class UpdateOrderStock {
  @ApiProperty({ example: OrderStatus.APPROVED })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({ example: 'Urgent restock needed' })
  @IsOptional()
  @IsString()
  note?: string;
}
