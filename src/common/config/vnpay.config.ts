import { registerAs } from '@nestjs/config';

export default registerAs('vnpay', () => ({
  vnpayTmnCode: process.env.VNP_TMNCODE || '',
  vnpaySecretKey: process.env.VNP_SECRET_KEY || '',
  vnpayUrl: process.env.VNPAY_URL || '',
  vnpayReturnUrl: process.env.VNP_RETURN_URL,
  vnpayClientReturn: process.env.WEB_CLIENT_LOCAL_HOST,
  vnpayClientMobileReturn: process.env.MOBILE_CILENT_LOCAL_HOST,
}));
