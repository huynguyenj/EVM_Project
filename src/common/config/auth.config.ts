import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessTokenExpired: process.env.JWT_ACCESS_TOKEN_EXPIRED,
  jwtRefreshTokenExpired: process.env.JWT_REFRESH_TOKEN_EXPIRED,
  hashSalt: parseInt(process.env.PASSWORD_HASHSALT || '12'),
  cookiesTime: parseInt(process.env.COOKIES_TIME || '60*60*24*7'),
  cookiesName: 'refreshToken',
  adminEmail: process.env.ADMIN_EMAIL,
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
}));
