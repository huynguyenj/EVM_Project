import { ApiResponseProperty } from '@nestjs/swagger';
import { DocumentCustomerContract } from 'src/dealer-staff/customer-contract/dto';
import { InstallmentContractResponseDto } from 'src/dealer-staff/installment-contract/dto';
import { QuotationResponseDto } from 'src/dealer-staff/quotation/dto';

export class CustomerContractResponse {
  @ApiResponseProperty({ type: InstallmentContractResponseDto })
  installmentContract: InstallmentContractResponseDto;

  @ApiResponseProperty({ type: [DocumentCustomerContract] })
  contractDocuments: DocumentCustomerContract[];

  @ApiResponseProperty({ type: QuotationResponseDto })
  quotation: QuotationResponseDto;
}
