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
      vnp_OrderInfo: `${billId}-${platform}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.vnPaySetting.vnpayReturnUrl || '',
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };
    const sortedParams = this.sortObject(vnp_params);

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
    const { vnp_ResponseCode, vnp_OrderInfo } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Bill id
    const billId = Number(orderInfoListInfo[0]);
    //Platform
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;

    if (vnp_ResponseCode === '00') {
      const isBillPaid = await this.prisma.agency_Bill.findUnique({
        where: {
          id: billId,
        },
      });
      if (isBillPaid && isBillPaid.isCompleted == true)
        return `${returnClientUrl + '/payment?status=fail'}`;

      await this.prisma.agency_Bill.update({
        where: {
          id: billId,
        },
        data: {
          isCompleted: true,
        },
      });
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  private checkPaymentReturn(vnp_Params: VnpParamResponse) {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    const sortedParams = this.sortObject(vnp_Params);
    const signData = QueryString.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', this.vnPaySetting.vnpaySecretKey);
    const signed = hmac.update(signData).digest('hex');

    if (secureHash === signed) {
      return { ...vnp_Params };
    } else {
      return null;
    }
  }

  private sortObject(object: any) {
    const sortedParams = Object.keys(object)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = encodeURIComponent(object[key]).replace(/%20/g, '+');
          return acc;
        },
        {} as Record<string, any>,
      );
    return sortedParams;
  }
}
