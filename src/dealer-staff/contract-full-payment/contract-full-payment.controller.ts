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
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContractFullPaymentService } from './contract-full-payment.service';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import {
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';
import {
  ContractFullPaymentResponseDto,
  CreateContractFullPaymentDto,
  UpdateContractFullPaymentDto,
} from './dto';

@Controller('contract-full-payment')
@ApiTags('Customer contract period payment of contract full type')
@ApiBearerAuth('access-token')
export class ContractFullPaymentController {
  constructor(private contractFullPaymentService: ContractFullPaymentService) {}

  @Post()
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Create period payment for contract full' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ContractFullPaymentResponseDto,
    'Create payment period for contract full success',
  )
  async createPeriodPaymentOfContractFull(
    @Body() createContractFullPaymentDto: CreateContractFullPaymentDto,
  ) {
    const createdData =
      await this.contractFullPaymentService.createCustomerContractPayment(
        createContractFullPaymentDto,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create payment period for contract full success',
      data: createdData,
    };
  }

  @Get('list/:contractId')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get list period payment of contract full' })
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    ContractFullPaymentResponseDto,
    'Get list contract payment period success',
  )
  async getListPeriodPayment(
    @Param('contractId', ParseIntPipe) contractId: number,
  ) {
    const listData =
      await this.contractFullPaymentService.getListCustomerContractFullPaymentByContractId(
        contractId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list contract payment period success',
      data: listData,
    };
  }

  @Get('detail/:periodId')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get period payment detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ContractFullPaymentResponseDto,
    'Get period detail success',
  )
  async getPeriodPaymentDetail(
    @Param('periodId', ParseIntPipe) periodId: number,
  ) {
    const data =
      await this.contractFullPaymentService.getCustomerContractFullPaymentById(
        periodId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get period detail success',
      data: data,
    };
  }

  @Patch(':periodId')
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Update period payment' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ContractFullPaymentResponseDto,
    'Update period payment success',
  )
  async updatePeriodPayment(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Body() updateContractFullPaymentDto: UpdateContractFullPaymentDto,
  ) {
    const updatedData =
      await this.contractFullPaymentService.updateContractFullPayment(
        periodId,
        updateContractFullPaymentDto,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update period payment success',
      data: updatedData,
    };
  }

  @Delete(':periodId')
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Delete period payment' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete period payment success')
  async deletePeriodPayment(@Param('periodId', ParseIntPipe) periodId: number) {
    const updatedData =
      await this.contractFullPaymentService.deleteContractFullPayment(periodId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete period payment success',
      data: updatedData,
    };
  }
}
