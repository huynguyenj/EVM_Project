import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Wholesale price for the agency' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Wholesale price will apply when agency import motorbike',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Wholesale price for motorbike' })
  policy: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 25000 })
  wholesalePrice: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  agencyId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  motorbikeId: number;
}
