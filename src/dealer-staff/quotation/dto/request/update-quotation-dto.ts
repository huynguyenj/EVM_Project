import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationStatus, QuotationType } from '../../types';

export class UpdateQuotationDto {
  @ApiProperty({ example: QuotationType.AT_STORE })
  @IsEnum(QuotationType)
  @IsOptional()
  type?: QuotationType;
  @ApiProperty({ example: QuotationStatus.ACCEPTED })
  @IsEnum(QuotationStatus)
  @IsOptional()
  status?: QuotationStatus;
  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsOptional()
  basePrice?: number;
  @ApiProperty({ example: 20000 })
  @IsNumber()
  @IsOptional()
  promotionPrice?: number;
  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsOptional()
  finalPrice?: number;
  @ApiProperty({ example: '2025-10-12T14:30:00.000Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  validUntil?: Date;
}
