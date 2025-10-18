import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateAgencyStockDto {
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
}
