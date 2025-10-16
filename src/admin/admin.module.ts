import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { RoleModule } from './role/role.module';
import { AgencyModule } from './agency/agency.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AgencyContractModule } from './agency-contract/agency-contract.module';

@Module({
  imports: [StaffModule, RoleModule, AgencyModule, WarehousesModule, AgencyContractModule],
})
export class AdminModule {}
