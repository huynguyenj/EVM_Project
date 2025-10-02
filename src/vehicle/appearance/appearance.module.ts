import { Module } from '@nestjs/common';
import { AppearanceService } from './appearance.service';
import { AppearanceController } from './appearance.controller';

@Module({
  providers: [AppearanceService],
  controllers: [AppearanceController]
})
export class AppearanceModule {}
