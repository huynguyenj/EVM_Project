import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignStockPromotionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  stockPromotionId: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNotEmpty()
  listStockId: [number];
}
