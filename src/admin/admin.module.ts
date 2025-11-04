import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { RoleModule } from './role/role.module';
import { AgencyModule } from './agency/agency.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { CreditLineModule } from './credit-line/credit-line.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [StaffModule, RoleModule, AgencyModule, WarehousesModule, CreditLineModule, DashboardModule],
})
export class AdminModule {}
