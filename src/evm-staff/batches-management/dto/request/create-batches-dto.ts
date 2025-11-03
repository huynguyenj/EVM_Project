import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBatchesDto {
  @ApiProperty({ example: 1496796 })
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;
  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyOrderId: number;
}
