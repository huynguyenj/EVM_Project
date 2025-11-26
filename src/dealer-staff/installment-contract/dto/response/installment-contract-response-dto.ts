import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentContractStatus, PenaltyType } from '../../types';

export class InstallmentContractResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  startDate: Date;

  @ApiResponseProperty({ example: 500 })
  penaltyValue: number;

  @ApiResponseProperty({ example: 1500 })
  prePaidTotal: number;

  @ApiResponseProperty({ example: 14000 })
  totalDebtPaid: number;

  @ApiResponseProperty({ example: 500 })
  totalInterestPaid: number;

  @ApiResponseProperty({ example: PenaltyType.FIXED })
  penaltyType: PenaltyType;

  @ApiResponseProperty({ example: InstallmentContractStatus.ACTIVE })
  status: InstallmentContractStatus;

  @ApiResponseProperty({ example: 1 })
  customerContractId: number;

  @ApiResponseProperty({ example: 1 })
  installmentPlanId: number;
}
