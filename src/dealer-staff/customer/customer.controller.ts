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
import { CustomerService } from './customer.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateCustomerDto,
  CustomerQueries,
  CustomerResponseDto,
  UpdateCustomerDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { CustomerQuery } from './decorators';

@Controller('customer')
@ApiBearerAuth('access-token')
@ApiTags('Dealer Staff - Customer Management')
@Roles(Role.DEALER_STAFF, Role.DEALER_MANAGER)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    CustomerResponseDto,
    'Create customer success',
  )
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const createdData =
      await this.customerService.createCustomer(createCustomerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create customer success',
      data: createdData,
    };
  }

  @Get('list/:agencyId')
  @ApiOperation({ summary: 'Get list customers' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    CustomerResponseDto,
    'Get list customers success',
  )
  @ApiQueriesAndPagination({ name: 'sort', example: 'newest', required: false })
  async getListCustomers(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @CustomerQuery() customerQueries: CustomerQueries,
  ) {
    const listData = await this.customerService.getListCustomer(
      agencyId,
      customerQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list customers success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:customerId')
  @ApiOperation({ summary: 'Get customer detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CustomerResponseDto,
    'Get customer detail success',
  )
  async getCustomerDetail(
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    const data = await this.customerService.getCustomerDetail(customerId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get customer detail success',
      data: data,
    };
  }

  @Patch(':customerId')
  @ApiOperation({ summary: 'Update customer' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CustomerResponseDto,
    'Update customer success',
  )
  async updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const data = await this.customerService.updateCustomer(
      customerId,
      updateCustomerDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update customer success',
      data: data,
    };
  }

  @Delete(':customerId')
  @ApiOperation({ summary: 'Delete customer' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete customer success')
  async deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    await this.customerService.deleteCustomer(customerId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete customer success',
      data: {},
    };
  }
}
