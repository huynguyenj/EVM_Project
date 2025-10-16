import { Module } from '@nestjs/common';
import { PriceModule } from './price/price.module';
import { DiscountModule } from './discount/discount.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [PriceModule, DiscountModule, PromotionModule]
})
export class PolicyModule {}
