import { Module } from '@nestjs/common';
import { SafeFeatureService } from './safe-feature.service';

@Module({
  providers: [SafeFeatureService]
})
export class SafeFeatureModule {}
