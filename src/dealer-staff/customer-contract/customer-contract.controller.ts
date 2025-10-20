import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { CustomerContractService } from './customer-contract.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateCustomerContractDto,
  CustomerContractDetailResponseDto,
  CustomerContractQueries,
  CustomerResponseContractDto,
  UpdateCustomerContractDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { ContractStatus, ContractType } from './types';
import { CustomerContractQuery } from './decorators';

@Controller('customer-contract')
@ApiTags('Dealer Manager & Dealer Staff - Management Customer Contract')
@ApiBearerAuth('access-token')
@Roles(Role.DEALER_MANAGER, Role.DEALER_STAFF)
export class CustomerContractController {
  constructor(private customerContractService: CustomerContractService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    CustomerResponseContractDto,
    'Create customer contract success',
  )
  @ApiOperation({ summary: 'Create customer contract' })
  async createCustomerContract(
    @Body() createCustomerContractDto: CreateCustomerContractDto,
  ) {
    const createdData =
      await this.customerContractService.createCustomerContract(
        createCustomerContractDto,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create customer contract success',
      data: createdData,
    };
  }

  @Get('list/:agencyId')
  @ApiOperation({ summary: 'Get list customer contract' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    CustomerResponseContractDto,
    'Get list customer contract successfully',
  )
  @ApiQueriesAndPagination(
    { name: 'staffId', example: 1, required: false },
    { name: 'customerId', example: 1, required: false },
    { name: 'status', example: ContractStatus.PENDING, required: false },
    { name: 'contractType', example: ContractType.AT_STORE, required: false },
  )
  async getListCustomerContract(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @CustomerContractQuery() customerContractQueries: CustomerContractQueries,
  ) {
    const listData = await this.customerContractService.getListCustomerContract(
      agencyId,
      customerContractQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list customer contract successfully!',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:customerContractId')
  @ApiOperation({ summary: 'Get customer contract detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CustomerContractDetailResponseDto,
    'Get customer contract detail success',
  )
  async getCustomerContractDetail(
    @Param('customerContractId', ParseIntPipe) customerContractId: number,
  ) {
    const data =
      await this.customerContractService.getCustomerContractDetail(
        customerContractId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get customer contract detail success',
      data: data,
    };
  }

  @Patch(':customerContractId')
  @ApiOperation({ summary: 'Update customer contract' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CustomerResponseContractDto,
    'Update customer contract success',
  )
  async updateCustomerContract(
    @Param('customerContractId', ParseIntPipe) customerContractId: number,
    @Body() updateCustomerContractDto: UpdateCustomerContractDto,
  ) {
    const data = await this.customerContractService.updateCustomerContract(
      customerContractId,
      updateCustomerContractDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update customer contract success',
      data: data,
    };
  }

  @Delete(':customerContractId')
  @ApiOperation({ summary: 'Delete customer contract' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Update customer contract success',
  )
  async deleteCustomerContract(
    @Param('customerContractId', ParseIntPipe) customerContractId: number,
  ) {
    await this.customerContractService.deleteCustomerContract(
      customerContractId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete customer contract success',
      data: {},
    };
  }
}
