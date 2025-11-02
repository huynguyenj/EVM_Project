import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { InstallmentPlanStatus, InterestPaidType } from '../../types';
import { Type } from 'class-transformer';

export class UpdateInstallmentPlanDto {
  @ApiProperty({ example: 'Installment for special' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Techcombank' })
  @IsString()
  @IsOptional()
  tensor?: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @IsOptional()
  interestRate?: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  interestRateTotalMonth?: number;

  @ApiProperty({ example: 14 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  totalPaidMonth?: number;

  @ApiProperty({ example: InterestPaidType.FLAT })
  @IsEnum(InterestPaidType)
  @IsOptional()
  interestPaidType?: InterestPaidType;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  prePaidPercent?: number;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @IsOptional()
  processFee?: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  startAt?: Date;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endAt?: Date;

  @ApiProperty({ example: InstallmentPlanStatus.ACTIVE })
  @IsEnum(InstallmentPlanStatus)
  @IsOptional()
  status?: InstallmentPlanStatus;
}
