import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContractFullPaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  period: number;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  customerContractId: number;
}
