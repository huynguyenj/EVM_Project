import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePriceDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Wholesale price for motorbike' })
  policy?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 25000 })
  wholesalePrice?: number;
}
