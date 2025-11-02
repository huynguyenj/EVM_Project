import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { InstallmentPlanStatus, InterestPaidType } from '../../types';
import { Type } from 'class-transformer';

export class CreateInstallmentPlanDto {
  @ApiProperty({ example: 'Installment for special' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Techcombank' })
  @IsString()
  @IsNotEmpty()
  tensor: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  interestRateTotalMonth: number;

  @ApiProperty({ example: 14 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  totalPaidMonth: number;

  @ApiProperty({ example: InterestPaidType.FLAT })
  @IsEnum(InterestPaidType)
  @IsNotEmpty()
  interestPaidType: InterestPaidType;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  prePaidPercent: number;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @IsNotEmpty()
  processFee: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  startAt: Date;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @ApiProperty({ example: InstallmentPlanStatus.ACTIVE })
  @IsEnum(InstallmentPlanStatus)
  @IsNotEmpty()
  status: InstallmentPlanStatus;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  agencyId: number;
}
