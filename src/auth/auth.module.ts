import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [authConfig.KEY],
      useFactory: (authSettings: ConfigType<typeof authConfig>) => {
        return {
          secret: authSettings.jwtSecret,
        };
      },
    }),
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
