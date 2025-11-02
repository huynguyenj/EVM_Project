import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentResponsePaymentDto } from 'src/dealer-staff/installment-contract/dto';

export class CustomerInstallmentContractDetailResponse {
  @ApiResponseProperty({ type: InstallmentResponsePaymentDto })
  installmentPayments: InstallmentResponsePaymentDto[];
}
