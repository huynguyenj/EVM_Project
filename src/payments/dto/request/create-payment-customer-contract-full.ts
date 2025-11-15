import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePeriodCustomerContractFullPayment {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  periodId: number;
}
