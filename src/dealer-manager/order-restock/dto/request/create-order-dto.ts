import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  pricePolicyId: number;

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
  warehouseId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  motorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  agencyId: number;
}
