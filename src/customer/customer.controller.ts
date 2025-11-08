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
} from './dto';
import { CustomerInfoQuery } from './decorators';

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
    @Param('credentialId', ParseIntPipe) credentialId: string,
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
}
