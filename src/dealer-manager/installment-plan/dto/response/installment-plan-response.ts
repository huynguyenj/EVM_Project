import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentPlanStatus, InterestPaidType } from '../../types';

export class InstallmentResponsePlanDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 'Installment for special' })
  name: string;

  @ApiResponseProperty({ example: 8 })
  interestRate: number;

  @ApiResponseProperty({ example: 12 })
  interestRateTotalMonth: number;

  @ApiResponseProperty({ example: 14 })
  totalPaidMonth: number;

  @ApiResponseProperty({ example: InterestPaidType.FLAT })
  interestPaidType: InterestPaidType;

  @ApiResponseProperty({ example: 20 })
  prePaidPercent: number;

  @ApiResponseProperty({ example: 500000 })
  processFee: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  startAt: Date;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  endAt: Date;

  @ApiResponseProperty({ example: InstallmentPlanStatus.ACTIVE })
  status: InstallmentPlanStatus;

  @ApiResponseProperty({ example: 1 })
  agencyId: number;
}
