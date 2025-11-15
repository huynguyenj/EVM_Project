import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateDepositPayment,
  CreatePaymentAgencyBill,
  CreatePaymentCustomer,
  CreatePeriodCustomerContractFullPayment,
  PaymentUrl,
  VnpParamQuery,
} from '../dto';
import { IpAddress } from './decorators';
import { ApiResponseDocument } from 'src/common/decorator';
import { type Response } from 'express';
import { VnpQueryQueries } from './decorators/vnp-query-decorator';

@Controller('vnpay')
@ApiTags('Payments')
export class VnpayController {
  constructor(private vnPayService: VnpayService) {}

  @Post('agency-bill')
  @SetMetadata('public', true)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PaymentUrl,
    'Get payment url success',
  )
  @ApiQuery({ name: 'platform', required: true, example: 'web' })
  async createAgencyBillPaymentUrl(
    @Query('platform') platform: string,
    @IpAddress() ipAddress: string,
    @Body() createAgencyBillPaymentUrl: CreatePaymentAgencyBill,
  ) {
    const paymentData = await this.vnPayService.getApBatchPaymentInformation(
      platform,
      ipAddress,
      createAgencyBillPaymentUrl,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Get payment url success',
      data: paymentData,
    };
  }

  @Post('customer-installment-payment')
  @SetMetadata('public', true)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PaymentUrl,
    'Get payment url success',
  )
  @ApiQuery({ name: 'platform', required: true, example: 'web' })
  async createCustomerInstallmentPaymentUrl(
    @Query('platform') platform: string,
    @IpAddress() ipAddress: string,
    @Body() createCustomerInstallmentPayment: CreatePaymentCustomer,
  ) {
    const paymentData =
      await this.vnPayService.getInstallmentPaymentInformation(
        platform,
        ipAddress,
        createCustomerInstallmentPayment,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Get payment url success',
      data: paymentData,
    };
  }

  @Post('customer-contract/full/payment')
  @SetMetadata('public', true)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PaymentUrl,
    'Get payment url success',
  )
  @ApiQuery({ name: 'platform', required: true, example: 'web' })
  async createCustomerContractPaymentUrl(
    @Query('platform') platform: string,
    @IpAddress() ipAddress: string,
    @Body()
    createPeriodCustomerContractPayment: CreatePeriodCustomerContractFullPayment,
  ) {
    const paymentData =
      await this.vnPayService.getCustomerContractPaymentInformation(
        platform,
        ipAddress,
        createPeriodCustomerContractPayment,
      );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Get payment url success',
      data: paymentData,
    };
  }

  @Post('customer/deposit/payment')
  @SetMetadata('public', true)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PaymentUrl,
    'Get payment url success',
  )
  @ApiQuery({ name: 'platform', required: true, example: 'web' })
  async createCustomerDepositPaymentUrl(
    @Query('platform') platform: string,
    @IpAddress() ipAddress: string,
    @Body() createCustomDeposit: CreateDepositPayment,
  ) {
    const paymentData = await this.vnPayService.getDepositPaymentInformation(
      platform,
      ipAddress,
      createCustomDeposit,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Get payment url success',
      data: paymentData,
    };
  }

  @Get('check/batch')
  @SetMetadata('public', true)
  async checkPayment(
    @VnpQueryQueries() query: VnpParamQuery,
    @Res() res: Response,
  ) {
    const returnUrl = await this.vnPayService.updateAgencyBatchPayment(query);
    return res.redirect(returnUrl);
  }

  @Get('check/customer/installment')
  @SetMetadata('public', true)
  async checkCustomerPayment(
    @VnpQueryQueries() query: VnpParamQuery,
    @Res() res: Response,
  ) {
    const returnUrl = await this.vnPayService.updateInstallmentPayment(query);
    return res.redirect(returnUrl);
  }

  @Get('check/customer/contract')
  @SetMetadata('public', true)
  async checkCustomerContractPayment(
    @VnpQueryQueries() query: VnpParamQuery,
    @Res() res: Response,
  ) {
    const returnUrl =
      await this.vnPayService.updateCustomerContractPeriodPayment(query);
    return res.redirect(returnUrl);
  }

  @Get('check/customer/deposit')
  @SetMetadata('public', true)
  async checkCustomerDepositPayment(
    @VnpQueryQueries() query: VnpParamQuery,
    @Res() res: Response,
  ) {
    const returnUrl = await this.vnPayService.updateDepositPayment(query);
    return res.redirect(returnUrl);
  }
}
