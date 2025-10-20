import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { InstallmentPaymentStatus } from '../../types';

export class UpdateInstallmentPaymentDto {
  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  paidDate: Date;

  @IsNumber()
  @ApiProperty({ example: 25000 })
  @IsOptional()
  amountDue: number;

  @IsNumber()
  @ApiProperty({ example: 25000 })
  @IsOptional()
  amountPaid: number;

  @IsNumber()
  @ApiProperty({ example: 2000 })
  @IsOptional()
  penaltyAmount: number;

  @IsEnum(InstallmentPaymentStatus)
  @ApiProperty({ example: InstallmentPaymentStatus.PENDING })
  @IsOptional()
  status: InstallmentPaymentStatus;
}
