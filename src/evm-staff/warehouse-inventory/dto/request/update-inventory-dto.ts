import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateInventoryDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'The next date that will restock quantity',
  })
  @IsDate()
  @IsOptional()
  stockDate: Date;
}
