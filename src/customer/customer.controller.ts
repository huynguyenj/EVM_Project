import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import {
  CustomerContractQueries,
  CustomerContractResponse,
  CustomerInstallmentContractDetailResponse,
  QuotationQueriesCustomerDto,
} from './dto';
import { CustomerInfoQuery, QuotationCustomerQuery } from './decorators';
import { QuotationResponseDto } from 'src/dealer-staff/quotation/dto';
import {
  QuotationStatus,
  QuotationType,
} from 'src/dealer-staff/quotation/types';
import { DepositResponseDto } from 'src/dealer-staff/deposit/dto';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('customer-contracts/:credentialId/:agencyId')
  @SetMetadata('public', true)
  @ApiQueriesAndPagination()
  @ApiOperation({ summary: 'Get customer contracts' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    CustomerContractResponse,
    'Get customer contracts successfully',
  )
  async getCustomerContracts(
    @Param('credentialId') credentialId: string,
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @CustomerInfoQuery() customerQueries: CustomerContractQueries,
  ) {
    const listData = await this.customerService.getContractByCustomer(
      credentialId,
      agencyId,
      customerQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get customer contract successfully',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('installment-detail/:installmentContractId')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get installment contract detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CustomerInstallmentContractDetailResponse,
    'Get installment contract detail success',
  )
  async getInstallmentDetail(
    @Param('installmentContractId', ParseIntPipe) installmentContractId: number,
  ) {
    const data = await this.customerService.getDetailInstallmentContract(
      installmentContractId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get installment contract detail success',
      data: data,
    };
  }

  @Get('list/quotation/:credentialId')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get list quotations' })
  @ApiQueriesAndPagination(
    { name: 'type', example: QuotationType.AT_STORE, required: false },
    { name: 'status', example: QuotationStatus.DRAFT, required: false },
    {
      name: 'quoteCode',
      example: '123e4567-e89b-12d3-a456-426614174000',
      required: false,
    },
    { name: 'agencyId', example: 1, required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    QuotationResponseDto,
    'Get list quotations success',
  )
  async getListQuotation(
    @Param('credentialId') credentialId: string,
    @QuotationCustomerQuery() quotationQueries: QuotationQueriesCustomerDto,
  ) {
    const listQuotations =
      await this.customerService.getListQuotationForCustomer(
        credentialId,
        quotationQueries,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list quotations success',
      data: listQuotations.data,
      paginationInfo: listQuotations.paginationInfo,
    };
  }

  @Get('deposit/:quotationId')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get deposit by quotation id' })
  @ApiResponseDocument(HttpStatus.OK, DepositResponseDto, 'Get deposit success')
  async getDeposit(@Param('quotationId') quotationId: number) {
    const depositData =
      await this.customerService.getDepositForCustomer(quotationId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get deposit success',
      data: depositData,
    };
  }
}
