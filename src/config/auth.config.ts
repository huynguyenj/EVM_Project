import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessTokenExpired: process.env.JWT_ACCESS_TOKEN_EXPIRED,
  jwtRefreshTokenExpired: process.env.JWT_REFRESH_TOKEN_EXPIRED,
  hashSalt: parseInt(process.env.PASSWORD_HASHSALT || '12'),
}));
