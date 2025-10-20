import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentPaymentStatus } from '../../types';

export class InstallmentResponsePaymentDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  dueDate: Date;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  paidDate: Date;

  @ApiResponseProperty({ example: 25000 })
  amountDue: number;

  @ApiResponseProperty({ example: 25000 })
  amountPaid: number;

  @ApiResponseProperty({ example: 2000 })
  penaltyAmount: number;

  @ApiResponseProperty({ example: InstallmentPaymentStatus.PENDING })
  status: InstallmentPaymentStatus;

  @ApiResponseProperty({ example: 1 })
  installmentContractId: number;
}
