import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCreditLineDto {
  @ApiPropertyOptional({
    description: 'The credit limit amount for the agency',
    example: 750000,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  creditLimit?: number;

  @ApiPropertyOptional({
    description:
      'Warning threshold percentage (0-100) to alert when credit usage reaches this level',
    example: 85,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  warningThreshold?: number;

  @ApiPropertyOptional({
    description: 'Number of days after which an unpaid credit becomes overdue',
    example: 45,
    type: Number,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  overDueThreshHoldDays?: number;

  @ApiPropertyOptional({
    description: 'Whether the credit line is blocked',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;
}
