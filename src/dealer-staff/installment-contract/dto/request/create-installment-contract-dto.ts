import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { InstallmentContractStatus, PenaltyType } from '../../types';

export class CreateInstallmentContractDto {
  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @IsNotEmpty()
  penaltyValue: number;

  @ApiProperty({ example: PenaltyType.FIXED })
  @IsEnum(PenaltyType)
  @IsNotEmpty()
  penaltyType: PenaltyType;

  @ApiProperty({ example: InstallmentContractStatus.ACTIVE })
  @IsEnum(InstallmentContractStatus)
  @IsNotEmpty()
  status: InstallmentContractStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  customerContractId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  installmentPlanId: number;
}
