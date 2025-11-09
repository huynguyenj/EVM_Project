import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepositPayment {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  depositId: number;
}
