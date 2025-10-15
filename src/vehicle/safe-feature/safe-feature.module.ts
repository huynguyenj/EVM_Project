import { Module } from '@nestjs/common';
import { SafeFeatureService } from './safe-feature.service';
import { SafeFeatureController } from './safe-feature.controller';

@Module({
  providers: [SafeFeatureService],
  exports: [SafeFeatureService],
  controllers: [SafeFeatureController],
})
export class SafeFeatureModule {}
