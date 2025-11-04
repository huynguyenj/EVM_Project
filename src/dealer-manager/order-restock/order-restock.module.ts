import { Module } from '@nestjs/common';
import { OrderRestockController } from './order-restock.controller';
import { OrderRestockService } from './order-restock.service';
import { DiscountModule } from 'src/policy/discount/discount.module';
import { PriceModule } from 'src/policy/price/price.module';
import { PromotionModule } from 'src/policy/promotion/promotion.module';
import { WarehouseInventoryModule } from 'src/evm-staff/warehouse-inventory/warehouse-inventory.module';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { CreditLineModule } from 'src/admin/credit-line/credit-line.module';

@Module({
  controllers: [OrderRestockController],
  providers: [OrderRestockService],
  imports: [
    CreditLineModule,
    DiscountModule,
    PriceModule,
    PromotionModule,
    WarehouseInventoryModule,
    MotorbikeModule,
  ],
  exports: [OrderRestockService],
})
export class OrderRestockModule {}
