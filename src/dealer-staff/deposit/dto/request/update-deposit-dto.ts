import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { DepositStatus } from '../../types';
import { Type } from 'class-transformer';

export class UpdateDepositDto {
  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  depositPercent?: number;
  @ApiProperty({ example: 1000 })
  @IsNumber()
  @IsOptional()
  depositAmount?: number;
  @ApiProperty({ example: '2025-10-12T14:30:00.000Z' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  holdDays?: Date;
  @ApiProperty({ example: DepositStatus.PENDING })
  @IsEnum(DepositStatus)
  @IsOptional()
  status?: DepositStatus;
}
