import { ApiProperty } from '@nestjs/swagger';
import { QuotationType } from '../../types/quotation.enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuotationDto {
  @ApiProperty({ example: QuotationType.AT_STORE })
  @IsEnum(QuotationType)
  @IsNotEmpty()
  type: QuotationType;
  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsNotEmpty()
  basePrice: number;
  @ApiProperty({ example: 20000 })
  @IsNumber()
  @IsOptional()
  promotionPrice?: number;
  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsNotEmpty()
  finalPrice: number;
  @ApiProperty({ example: '2025-10-12T14:30:00.000Z' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validUntil: Date;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  motorbikeId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  colorId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  dealerStaffId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;
}
