import { Module } from '@nestjs/common';
import { CreditLineController } from './credit-line.controller';
import { CreditLineService } from './credit-line.service';

@Module({
  controllers: [CreditLineController],
  providers: [CreditLineService],
  exports: [CreditLineService],
})
export class CreditLineModule {}
