import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { OrderRestockModule } from './order-restock/order-restock.module';
import { AgencyStockModule } from './agency-stock/agency-stock.module';
import { InstallmentPlanModule } from './installment-plan/installment-plan.module';
import { StockPromotionModule } from './stock-promotion/stock-promotion.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [
    StaffModule,
    OrderRestockModule,
    AgencyStockModule,
    InstallmentPlanModule,
    StockPromotionModule,
    RevenueModule,
  ],
})
export class DealerManagerModule {}
