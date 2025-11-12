import { registerAs } from '@nestjs/config';

export default registerAs('resend', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  resendSender: process.env.RESEND_SENDER,
}));
