import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateRevenueDto {
  @ApiProperty({ example: 15000 })
  @IsNumber()
  @IsOptional()
  total: number;
}
