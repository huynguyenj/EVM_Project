import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { RoleModule } from './role/role.module';
import { AgencyModule } from './agency/agency.module';

@Module({
  imports: [StaffModule, RoleModule, AgencyModule],
})
export class AdminModule {}
