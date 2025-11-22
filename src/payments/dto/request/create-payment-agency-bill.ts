import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentAgencyBill {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
