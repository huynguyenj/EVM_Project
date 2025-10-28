import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentContractResponseDto } from './installment-contract-response-dto';
import { InstallmentResponsePaymentDto } from './installment-payment-response';
import { InstallmentResponsePlanDto } from 'src/dealer-manager/installment-plan/dto';
import { CustomerResponseContractDto } from 'src/dealer-staff/customer-contract/dto';

export class InstallmentContractDetailResponseDto extends InstallmentContractResponseDto {
  @ApiResponseProperty({ type: CustomerResponseContractDto })
  customerContract: CustomerResponseContractDto;

  @ApiResponseProperty({ type: InstallmentResponsePlanDto })
  installmentPlan: InstallmentContractResponseDto;

  @ApiResponseProperty({ type: [InstallmentResponsePaymentDto] })
  installmentPayments: [InstallmentResponsePaymentDto];
}
