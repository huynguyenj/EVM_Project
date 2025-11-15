import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateContractFullPaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  period: number;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsOptional()
  amount: number;
}
