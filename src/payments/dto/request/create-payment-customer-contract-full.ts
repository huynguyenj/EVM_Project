import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerContractFullPayment {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  customerContractId: number;
}
