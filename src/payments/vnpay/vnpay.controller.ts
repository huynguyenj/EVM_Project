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
  AgencyBillPaymentUrl,
  CreatePaymentAgencyBill,
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
    AgencyBillPaymentUrl,
    'Get payment url success',
  )
  @ApiQuery({ name: 'platform', required: true, example: 'web' })
  async createAgencyBillPaymentUrl(
    @Query('platform') platform: string,
    @IpAddress() ipAddress: string,
    @Body() createAgencyBillPaymentUrl: CreatePaymentAgencyBill,
  ) {
    const paymentData = await this.vnPayService.getBillInformation(
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

  @Get('check')
  @SetMetadata('public', true)
  async checkPayment(
    @VnpQueryQueries() query: VnpParamQuery,
    @Res() res: Response,
  ) {
    const returnUrl = await this.vnPayService.createAgencyBillPayment(query);
    return res.redirect(returnUrl);
  }
}
