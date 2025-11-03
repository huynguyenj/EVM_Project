import { ApiResponseProperty } from '@nestjs/swagger';

export class CreditLineResponseDto {
  @ApiResponseProperty({
    example: 1,
    type: Number,
  })
  id: number;

  @ApiResponseProperty({
    example: 500000,
    type: Number,
  })
  creditLimit: number;

  @ApiResponseProperty({
    example: 80,
    type: Number,
  })
  warningThreshold: number;

  @ApiResponseProperty({
    example: 30,
    type: Number,
  })
  overDueThreshHoldDays: number;

  @ApiResponseProperty({
    example: false,
    type: Boolean,
  })
  isBlocked: boolean;

  @ApiResponseProperty({
    example: 123,
    type: Number,
  })
  agencyId: number;
}
