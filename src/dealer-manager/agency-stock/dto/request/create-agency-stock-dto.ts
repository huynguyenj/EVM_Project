import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateAgencyStockDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 155000 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  agencyId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  motorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  colorId: number;
}
