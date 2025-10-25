import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PromotionValueType, PromotionStatus } from '../../types';
import { Type } from 'class-transformer';

export class CreatePromotionDto {
  @ApiProperty({ example: 'Woman day celebrate' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'For all makeup items will sale at 10% - 20%' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: PromotionValueType,
    example: PromotionValueType.PERCENT,
    description: 'Type of value like percent or fixed.',
  })
  @IsEnum(PromotionValueType)
  @IsNotEmpty()
  valueType: PromotionValueType;

  @ApiProperty({
    example: 10,
    description:
      'If value type is percent input will <=100 and > 0, with fixed type it is a number > 0',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'The next date that will restock quantity',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'The next date that will restock quantity',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endAt: Date;

  @ApiProperty({
    enum: PromotionStatus,
    example: PromotionStatus.ACTIVE,
    description: 'Status of promotion.',
  })
  @IsEnum(PromotionStatus)
  @IsNotEmpty()
  status: PromotionStatus;

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty({ example: 1 })
  // agencyId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  motorbikeId?: number;
}
