import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import * as Joi from 'joi';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        PASSWORD_HASHSALT: Joi.number().required(),
        JWT_ACCESS_TOKEN_EXPIRED: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRED: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
    StaffModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
