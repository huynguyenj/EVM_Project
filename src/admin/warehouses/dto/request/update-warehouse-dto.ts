import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateWarehouseDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'USA' })
  location?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Washinton New York' })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Warehouse 1' })
  name?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  isActive?: boolean;
}
