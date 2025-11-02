import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepositDto {
  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsNotEmpty()
  depositPercent: number;
  @ApiProperty({ example: 1000 })
  @IsNumber()
  @IsNotEmpty()
  depositAmount: number;
  @ApiProperty({ example: '2025-10-12T14:30:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  holdDays: Date;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  quotationId: number;
}
