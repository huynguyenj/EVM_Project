import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'USA' })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Washinton New York' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Warehouse 1' })
  name: string;
}
