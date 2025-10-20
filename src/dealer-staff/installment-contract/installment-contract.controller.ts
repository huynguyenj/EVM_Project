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
import { InstallmentContractService } from './installment-contract.service';
import { ApiResponseDocument } from 'src/common/decorator';
import {
  CreateInstallmentContractDto,
  InstallmentContractDetailResponseDto,
  InstallmentContractResponseDto,
  InstallmentResponsePaymentDto,
  UpdateInstallmentContractDto,
  UpdateInstallmentPaymentDto,
} from './dto';

@Controller('installment-contract')
@ApiBearerAuth('access-token')
@ApiTags(
  'Dealer Manager & Dealer Staff - Installment contract management & Installment Payment',
)
@Roles(Role.DEALER_MANAGER, Role.DEALER_STAFF)
export class InstallmentContractController {
  constructor(private installmentContractService: InstallmentContractService) {}

  @Post()
  @ApiOperation({ summary: 'Create installment contract' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    InstallmentContractResponseDto,
    'Create installment contract success',
  )
  async createInstallmentContract(
    @Body() createInstallmentContractDto: CreateInstallmentContractDto,
  ) {
    const createdData =
      await this.installmentContractService.createInstallmentContract(
        createInstallmentContractDto,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create installment contract success',
      data: createdData,
    };
  }

  @Post('generate/interest-payments/:installmentContractId')
  @ApiOperation({ summary: 'Generate interest payments' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    Object,
    'Create interest payment success',
  )
  async createInstallmentContractPayments(
    @Param('installmentContractId', ParseIntPipe) installmentContractId: number,
  ) {
    await this.installmentContractService.generateInterest(
      installmentContractId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create interest payments success',
      data: {},
    };
  }

  @Get('installment-contract/customer-contract/:customerContractId')
  @ApiOperation({ summary: 'Get installment contract by customer contract id' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentContractResponseDto,
    'Get installment contract success',
  )
  async getInstallmentContractByCustomerContractId(
    @Param('customerContractId', ParseIntPipe) customerContractId: number,
  ) {
    const data =
      await this.installmentContractService.getInstallmentContractByCustomerContractId(
        customerContractId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get installment contract success!',
      data: data,
    };
  }

  @Get('installment-contract/detail/:installmentContractId')
  @ApiOperation({ summary: 'Get installment contract detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentContractDetailResponseDto,
    'Get installment contract detail success',
  )
  async getInstallmentContractDetail(
    @Param('installmentContractId', ParseIntPipe) installmentContractId: number,
  ) {
    const data =
      await this.installmentContractService.getInstallmentContractDetail(
        installmentContractId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get installment contract detail success',
      data: data,
    };
  }

  @Get('installlment-payment/detail/:installmentPaymentId')
  @ApiOperation({ summary: 'Get installment payment detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentResponsePaymentDto,
    'Get installment payment detail success',
  )
  async getInstallmentPaymentDetail(
    @Param('installmentPaymentId', ParseIntPipe) installmentPaymentId: number,
  ) {
    const data =
      await this.installmentContractService.getInstallmentPaymentDetail(
        installmentPaymentId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get installment payment detail success',
      data: data,
    };
  }

  @Patch('installment-contract/update/:installmentContractId')
  @ApiOperation({ summary: 'Update installment contract' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentContractResponseDto,
    'Update installment contract success',
  )
  async updateInstallmentContract(
    @Param('installmentContractId', ParseIntPipe) installmentContractId: number,
    @Body() updateInstallmentContractDto: UpdateInstallmentContractDto,
  ) {
    const updatedData =
      await this.installmentContractService.updateInstallmentContract(
        installmentContractId,
        updateInstallmentContractDto,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update installment contract success',
      data: updatedData,
    };
  }

  @Patch('installment-payment/update/:installmentPaymentId')
  @ApiOperation({ summary: 'Update installment payment' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentResponsePaymentDto,
    'Update installment payment success',
  )
  async updateInstallmentPayment(
    @Param('installmentPaymentId', ParseIntPipe) installmentPaymentId: number,
    @Body() updateInstallmentPaymentDto: UpdateInstallmentPaymentDto,
  ) {
    const updatedData =
      await this.installmentContractService.updateInstallmentPayment(
        installmentPaymentId,
        updateInstallmentPaymentDto,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update installment payment success',
      data: updatedData,
    };
  }

  @Delete('installment-contract/delete/:installmentContractId')
  @ApiOperation({ summary: 'Delete installment contract' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete installment contract success',
  )
  async deleteInstallmentContract(
    @Param('installmentContractId', ParseIntPipe) installmentContractId: number,
  ) {
    await this.installmentContractService.deleteInstallmentContract(
      installmentContractId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete installment contract success',
      data: {},
    };
  }

  @Delete('installment-payment/delete/:installmentPaymentId')
  @ApiOperation({ summary: 'Delete installment payment' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete installment payment success',
  )
  async deleteInstallmentPayment(
    @Param('installmentPaymentId', ParseIntPipe) installmentPaymentId: number,
  ) {
    await this.installmentContractService.deleteInstallmentPayment(
      installmentPaymentId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete installment payment success',
      data: {},
    };
  }
}
