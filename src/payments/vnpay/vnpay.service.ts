import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import vnpayConfig from 'src/common/config/vnpay.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentAgencyBill } from '../dto';
import QueryString from 'qs';
import crypto from 'crypto';
import { VnpParam, VnpParamResponse } from '../types';
@Injectable()
export class VnpayService {
  constructor(
    private prisma: PrismaService,
    @Inject(vnpayConfig.KEY)
    private vnPaySetting: ConfigType<typeof vnpayConfig>,
  ) {}

  async getBillInformation(
    platform: string,
    ipAddress: string,
    createPaymentBill: CreatePaymentAgencyBill,
  ) {
    const data = await this.prisma.agency_Bill.findUnique({
      where: {
        id: createPaymentBill.agencyBillId,
      },
    });
    if (!data) throw new NotFoundException('This bill is not existed');
    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      data.amount,
      data.id,
    );
    return vnpUrl;
  }

  private createPaymentUrl(
    platform: string,
    ipAddress: string,
    amount: number,
    billId: number,
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
      vnp_OrderInfo: `${billId}&${platform}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.vnPaySetting.vnpayReturnUrl || '',
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };
    const sortedParams = Object.keys(vnp_params)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = encodeURIComponent(vnp_params[key]).replace(/%20/g, '+');
          return acc;
        },
        {} as Record<string, any>,
      );

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

  async createAgencyBillPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_Amount, vnp_ResponseCode, vnp_OrderInfo } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('&'); //vnp_OrderInfo = 1&web
    const billId = orderInfoListInfo[0];
    const platform = orderInfoListInfo[1];
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;
    if (vnp_ResponseCode === '00') {
      // await this.prisma.agency_Payment.create({
      //   data: {
      //     amount: Number(vnp_Amount) / 100,
      //     paidAt: new Date(),
      //     agencyBillId: Number(vnp_OrderInfo),
      //   },
      // });
      // await this.prisma.agency_Bill.update({
      //   where: {
      //     id: Number(vnp_OrderInfo),
      //   },
      //   data: {
      //     isCompleted: true,
      //   },
      // });
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  private checkPaymentReturn(vnp_Params: VnpParamResponse) {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = (vnp_Params as any)[key];
          return acc;
        },
        {} as Record<string, string>,
      );
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
