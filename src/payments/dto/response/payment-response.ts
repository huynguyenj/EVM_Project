import { ApiResponseProperty } from '@nestjs/swagger';

export class PaymentUrl {
  @ApiResponseProperty({
    example:
      'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Version=2.1.0&vnp_Command=pay&vnp_TmnCode=H396JHCO&vnp_Locale=vn&vnp_CurrCode=VND&vnp_TxnRef=1761918591517&vnp_OrderInfo=2&vnp_OrderType=web&vnp_Amount=271150000&vnp_ReturnUrl=https://evm-project.onrender.com/vnpay/check&vnp_IpAddr=::1&vnp_CreateDate=20251031134951&vnp_SecureHash=98a4c9a4d08c2115ee6a7e91991a67dadcd823d2fa2fe8b9f36a35474b98c0ee09c49a70ced4632578ff2444f87824f3218cb1646d2743c85e4603752792c556&vnp_SecureHashType=SHA512"',
  })
  paymentUrl: string;
}
