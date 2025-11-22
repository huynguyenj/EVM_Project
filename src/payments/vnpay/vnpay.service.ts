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
  CreateDepositPayment,
  CreatePaymentAgencyBill,
  CreatePaymentCustomer,
  CreatePeriodCustomerContractFullPayment,
} from '../dto';
import QueryString from 'qs';
import crypto from 'crypto';
import { VnpParam, VnpParamResponse } from '../types';
// import { BatchesManagementService } from 'src/evm-staff/batches-management/batches-management.service';
import { sortObject } from './utils/vnpayHelper';
import { DepositService } from 'src/dealer-staff/deposit/deposit.service';
import { ContractFullPaymentService } from 'src/dealer-staff/contract-full-payment/contract-full-payment.service';
import { OrderRestockService } from 'src/dealer-manager/order-restock/order-restock.service';
import { CreditLineService } from 'src/admin/credit-line/credit-line.service';
@Injectable()
export class VnpayService {
  constructor(
    private prisma: PrismaService,
    @Inject(vnpayConfig.KEY)
    private vnPaySetting: ConfigType<typeof vnpayConfig>,
    // private batchesService: BatchesManagementService,
    private depositService: DepositService,
    private orderService: OrderRestockService,
    private contractFullPaymentService: ContractFullPaymentService,
    private credirtLineService: CreditLineService,
  ) {}

  async getOrderPaymentInformation(
    platform: string,
    ipAddress: string,
    createPaymentBill: CreatePaymentAgencyBill,
  ) {
    const data = await this.orderService.getOrderById(
      createPaymentBill.orderId,
    );
    if (data.paidAmount === data.total)
      throw new BadRequestException('This order is already paid');
    if (createPaymentBill.amount > data.total - data.paidAmount)
      throw new BadRequestException(
        'Payment amount exceeds the remaining amount to be paid',
      );
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
    createPeriodCustomerContract: CreatePeriodCustomerContractFullPayment,
  ) {
    const data =
      await this.contractFullPaymentService.getCustomerContractFullPaymentById(
        createPeriodCustomerContract.periodId,
      );
    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      data.amount,
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

  async getDepositPaymentInformation(
    platform: string,
    ipAddress: string,
    createDepositPayment: CreateDepositPayment,
  ) {
    const depositData = await this.depositService.getDepositById(
      createDepositPayment.depositId,
    );
    if (depositData.status === 'EXPIRED' || depositData.holdDays < new Date())
      throw new BadRequestException('This deposit was expired.');

    if (depositData.status === 'APPLIED')
      throw new BadRequestException('This deposit already paid');

    const vnpUrl = this.createPaymentUrl(
      platform,
      ipAddress,
      depositData.depositAmount,
      depositData.id,
      this.vnPaySetting.vnpayReturnUrlCustomerDeposit,
    );
    return vnpUrl;
  }

  async updateDepositPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Deposit id
    const depositId = Number(orderInfoListInfo[0]);
    //Platform type
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;
    //Check payment response
    if (vnp_ResponseCode === '00') {
      await this.depositService.updateDepositPayment(depositId);
      return `${returnClientUrl + '/payment?status=success'}`;
    } else {
      return `${returnClientUrl + '/payment?status=fail'}`;
    }
  }

  async updateAgencyOrderPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo, vnp_Amount, vnp_TransactionNo } =
      vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Batch id
    const orderId = Number(orderInfoListInfo[0]);
    //Platform type
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;
    //Check payment response
    if (vnp_ResponseCode === '00') {
      const order = await this.orderService.getOrderById(orderId);
      await this.prisma.order_Payment.create({
        data: {
          invoiceNumber: String(vnp_TransactionNo),
          agencyOrderId: order.id,
          amount: vnp_Amount / 100,
          payAt: new Date(),
        },
      });
      await this.orderService.updatePaidAmount(order.id, vnp_Amount / 100);
      await this.credirtLineService.updateCurrentDebtPaidOff(
        order.agencyId,
        vnp_Amount / 100,
      );
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

  async updateCustomerContractPeriodPayment(vnp_Params: VnpParamResponse) {
    const vnpData = this.checkPaymentReturn(vnp_Params);
    if (!vnpData)
      return `${this.vnPaySetting.vnpayClientReturn + '/payment?status=invalid'}`;
    const { vnp_ResponseCode, vnp_OrderInfo } = vnpData;
    const orderInfoListInfo = vnp_OrderInfo.split('-'); //vnp_OrderInfo = 1&web
    //Customer contract id
    const periodId = Number(orderInfoListInfo[0]);
    //Platform
    const platform = orderInfoListInfo[1];
    //Return client url
    const returnClientUrl =
      platform === 'web'
        ? this.vnPaySetting.vnpayClientReturn
        : this.vnPaySetting.vnpayClientMobileReturn;

    if (vnp_ResponseCode === '00') {
      await this.contractFullPaymentService.updatePayment(periodId);
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
