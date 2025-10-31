import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRevenueDto {
  @ApiProperty({ example: 15000 })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;
}
