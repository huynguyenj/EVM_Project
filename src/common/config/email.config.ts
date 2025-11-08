import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
}));
