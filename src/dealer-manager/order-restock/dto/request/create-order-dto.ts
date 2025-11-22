import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  discountId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  promotionId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  motorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  colorId: number;
}

export class CreateAgencyOrderDto {
  // @ApiProperty({ example: AgencyOrderType.FULL })
  // @IsEnum(AgencyOrderType)
  // @IsNotEmpty()
  // orderType: AgencyOrderType;
  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  orderItems: CreateOrderItemDto[];
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  agencyId: number;
}
