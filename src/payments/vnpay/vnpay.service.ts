import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import vnpayConfig from 'src/common/config/vnpay.config';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerContractFullPayment,
  CreatePaymentAgencyBill,
  CreatePaymentCustomer,
} from '../dto';
import QueryString from 'qs';
import crypto from 'crypto';
import { VnpParam, VnpParamResponse } from '../types';
import { BatchesManagementService } from 'src/evm-staff/batches-management/batches-management.service';
import { sortObject } from './utils/vnpayHelper';
import { CustomerContractService } from 'src/dealer-staff/customer-contract/customer-contract.service';
@Injectable()
export class VnpayService {
  constructor(
    private prisma: PrismaService,
    @Inject(vnpayConfig.KEY)
    private vnPaySetting: ConfigType<typeof vnpayConfig>,
    private batchesService: BatchesManagementService,
    private customerContractService: CustomerContractService,
  ) {}

  async getApBatchPaymentInformation(
    platform: string,
    ipAddress: string,
    createPaymentBill: CreatePaymentAgencyBill,
  ) {
    const data = await this.prisma.ap_Batches.findUnique({
      where: { id: createPaymentBill.batchId },
    });
    if (!data) throw new NotFoundException('This batch is not existed');
    if (data.amount === 0)
      throw new BadRequestException('This batch is already paid');
    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      createPaymentBill.amount,
      data.id,
      this.vnPaySetting.vnpayReturnUrlBatch,
    );
    return vnpUrl;
  }

  async getCustomerContractPaymentInformation(
    platform: string,
    ipAddress: string,
    createCustomerContract: CreateCustomerContractFullPayment,
  ) {
    const data = await this.customerContractService.getCustomerContractById(
      createCustomerContract.customerContractId,
    );
    if (data.status === 'COMPLETED')
      throw new BadRequestException('This customer contract already completed');
    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      data.finalPrice,
      data.id,
      this.vnPaySetting.vnpayReturnUrlCustomerContract,
    );
    return vnpUrl;
  }

  async getInstallmentPaymentInformation(
    platform: string,
    ipAddress: string,
    createPaymentCustomer: CreatePaymentCustomer,
  ) {
    const data = await this.prisma.installment_Schedule.findUnique({
      where: {
        id: createPaymentCustomer.installmentScheduleId,
      },
    });
    if (!data) throw new NotFoundException('This installment is not existed');
    if (data.status === 'PAID')
      throw new BadRequestException('This installment is already paid');
    //Calculate amount
    let amount = 0;
    if (data.dueDate != null && data.dueDate < new Date()) {
      amount = data.amountDue + data.penaltyAmount;
    } else {
      amount = data.amountDue;
    }
    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      amount,
      data.id,
      this.vnPaySetting.vnpayReturnUrlCustomerInstallment,
    );
    return vnpUrl;
  }

  async updateAgencyBatchPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo, vnp_Amount } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Batch id
    const batchId = Number(orderInfoListInfo[0]);
    //Platform type
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;
    //Check payment response
    if (vnp_ResponseCode === '00') {
      const apBatches = await this.batchesService.getBatchWithOrder(batchId);
      await this.prisma.ap_Payments.create({
        data: {
          amount: vnp_Amount / 100,
          paidDate: new Date(),
          apBatchesId: apBatches.id,
        },
      });
      const restAmount = apBatches.amount - vnp_Amount / 100;
      if (restAmount === 0) {
        await this.batchesService.updateCompleteBatch(
          batchId,
          apBatches.agencyId,
          restAmount,
        );
      } else {
        await this.batchesService.updatePartialBatch(batchId, restAmount);
      }
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  async updateInstallmentPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo, vnp_Amount } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Installment id
    const installmentScheduleId = Number(orderInfoListInfo[0]);
    //Platform
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;

    if (vnp_ResponseCode === '00') {
      await this.prisma.installment_Schedule.update({
        where: {
          id: installmentScheduleId,
        },
        data: {
          status: 'PAID',
          amountPaid: vnp_Amount / 100,
          paidDate: new Date(),
        },
      });
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  async updateCustomerContractPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Customer contract id
    const customerContractId = Number(orderInfoListInfo[0]);
    //Platform
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;

    if (vnp_ResponseCode === '00') {
      await this.customerContractService.updateCompleteCustomerContract(
        customerContractId,
      );
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  //Payment resolver
  private createPaymentUrl(
    platform: string,
    ipAddress: string,
    amount: number,
    billId: number,
    returnUrl?: string,
  ) {
    const createDate = new Date()
      .toISOString()
      .replace(/[-:T.Z]/g, '')
      .slice(0, 14); //20220101103111: date required by vnpay
    const timeStamp = Date.now();
    const vnp_params: VnpParam = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnPaySetting.vnpayTmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: timeStamp,
      vnp_OrderInfo: `${billId}-${platform}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl || '',
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };
    const sortedParams = sortObject(vnp_params);

    const signData = QueryString.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnPaySetting.vnpaySecretKey);
    const signed = hmac.update(signData).digest('hex');

    vnp_params['vnp_SecureHash'] = signed;
    vnp_params['vnp_SecureHashType'] = 'SHA512';

    const vnpUrl = `${this.vnPaySetting.vnpayUrl}?${QueryString.stringify(vnp_params, { encode: false })}`;
    return {
      paymentUrl: vnpUrl,
    };
  }

  private checkPaymentReturn(vnp_Params: VnpParamResponse) {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    const sortedParams = sortObject(vnp_Params);
    const signData = QueryString.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnPaySetting.vnpaySecretKey);
    const signed = hmac.update(signData).digest('hex');

    if (secureHash === signed) {
      return { ...vnp_Params };
    } else {
      return null;
    }
  }
}
