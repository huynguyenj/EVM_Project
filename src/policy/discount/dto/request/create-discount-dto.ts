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
import { DiscountType, DiscountStatus, ValueType } from '../../types';
import { Type } from 'class-transformer';

export class CreateDiscountDto {
  @ApiProperty({ example: 'Buy 100 elv motorbike' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: DiscountType,
    example: DiscountType.SPECIAL,
    description: 'Type of discount.',
  })
  @IsEnum(DiscountType)
  @IsNotEmpty()
  type: DiscountType;

  @ApiProperty({
    enum: ValueType,
    example: ValueType.PERCENT,
    description: 'Type of value like percent or fixed.',
  })
  @IsEnum(ValueType)
  @IsNotEmpty()
  valueType: ValueType;

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
    example: 100,
    description:
      'Amount condition if discount is volume, if not this field can be null',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  min_quantity?: number;

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
    enum: DiscountStatus,
    example: DiscountStatus.ACTIVE,
    description: 'Status of discount.',
  })
  @IsEnum(DiscountStatus)
  @IsNotEmpty()
  status: DiscountStatus;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  agencyId?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  motorbikeId: number;
}
