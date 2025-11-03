import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateBatchesDto {
  @ApiProperty({ example: 1496796 })
  @IsOptional()
  invoiceNumber: number;
  @ApiProperty({ example: 150000 })
  @IsOptional()
  amount: number;
  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dueDate: Date;
}
