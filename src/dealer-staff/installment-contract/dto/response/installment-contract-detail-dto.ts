import { ApiResponseProperty } from '@nestjs/swagger';
import { InstallmentContractResponseDto } from './installment-contract-response-dto';
import { InstallmentResponsePaymentDto } from './installment-payment-response';
import { CustomerResponseContractDto } from 'src/dealer-staff/customer-contract/dto';
import { InstallmentResponsePlanDto } from 'src/dealer-manager/installment-plan/dto';

export class InstallmentContractDetailResponseDto extends InstallmentContractResponseDto {
  @ApiResponseProperty({ type: [InstallmentContractDetailResponseDto] })
  installmentPayments: InstallmentResponsePaymentDto[];

  @ApiResponseProperty({ type: CustomerResponseContractDto })
  customerContract: CustomerResponseContractDto;

  @ApiResponseProperty({ type: InstallmentResponsePlanDto })
  installmentPlan: InstallmentContractResponseDto;
}
