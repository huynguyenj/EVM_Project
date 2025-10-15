import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'The next date that will restock quantity',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  stockDate: Date;
}
