import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffModule } from 'src/staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (authSettings: ConfigType<typeof authConfig>) => {
        return {
          secret: authSettings.jwtSecret,
        };
      },
      inject: [authConfig.KEY],
    }),
    StaffModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
