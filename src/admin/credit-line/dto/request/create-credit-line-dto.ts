import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsInt, Min } from 'class-validator';
export class CreateCreditLineDto {
  @ApiProperty({
    description: 'The credit limit amount for the agency',
    example: 500000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  creditLimit: number;

  @ApiProperty({
    description:
      'Warning threshold percentage (0-100) to alert when credit usage reaches this level',
    example: 80,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  warningThreshold: number;

  @ApiProperty({
    description: 'Number of days after which an unpaid credit becomes overdue',
    example: 30,
    type: Number,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  overDueThreshHoldDays: number;

  @ApiProperty({
    description: 'The ID of the agency this credit line belongs to',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  agencyId: number;
}
