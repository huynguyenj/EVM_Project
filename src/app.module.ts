import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionModule } from './permission/permission.module';
import * as Joi from 'joi';
import authConfig from './common/config/auth.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RoleGuard } from './auth/guard';
import { VehicleModule } from './vehicle/vehicle.module';
import { AdminModule } from './admin/admin.module';
import { DealerManagerModule } from './dealer-manager/dealer-manager.module';
import { SupabaseModule } from './supabase/supabase.module';
import supabaseConfig from './common/config/supabase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, supabaseConfig],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        PASSWORD_HASHSALT: Joi.number().required(),
        JWT_ACCESS_TOKEN_EXPIRED: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRED: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
    PermissionModule,
    VehicleModule,
    AdminModule,
    DealerManagerModule,
    SupabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
