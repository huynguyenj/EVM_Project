import { Module } from '@nestjs/common';
import { StockPromotionController } from './stock-promotion.controller';
import { StockPromotionService } from './stock-promotion.service';

@Module({
  controllers: [StockPromotionController],
  providers: [StockPromotionService]
})
export class StockPromotionModule {}
