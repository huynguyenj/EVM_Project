import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import authConfig from './common/config/auth.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RoleGuard } from './auth/guard';
import { VehicleModule } from './vehicle/vehicle.module';
import { AdminModule } from './admin/admin.module';
import { DealerManagerModule } from './dealer-manager/dealer-manager.module';
import { SupabaseModule } from './supabase/supabase.module';
import { EvmStaffModule } from './evm-staff/evm-staff.module';
import { PolicyModule } from './policy/policy.module';
import { SeederModule } from './seeder/seeder.module';
import { DealerStaffModule } from './dealer-staff/dealer-staff.module';
import { PaymentsModule } from './payments/payments.module';
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
        ADMIN_EMAIL: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        ADMIN_USERNAME: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
    VehicleModule,
    AdminModule,
    DealerManagerModule,
    SupabaseModule,
    EvmStaffModule,
    PolicyModule,
    SeederModule,
    DealerStaffModule,
    PaymentsModule,
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
