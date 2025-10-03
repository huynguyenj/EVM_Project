import { Body, Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { type StaffQuery } from './types/staff-query';
import { StaffQueries } from './decorator/staff.decorator';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}
  @Get('admin')
  @Roles(Role.ADMIN)
  async getAllStaffAdmin(@StaffQueries() staffQuery: StaffQuery) {
    const staffList = await this.staffService.getAllStaffAdmin(staffQuery);
    return {
      data: staffList,
      message: 'Get all staff successfully',
    };
  }

  @Get('agency')
  @Roles(Role.ADMIN)
  async getAllStaffAgency(@StaffQueries() staffQuery: StaffQuery) {
    const staffList = await this.staffService.getAllStaffAgency(staffQuery);
    return {
      data: staffList,
      message: 'Get all staff successfully',
    };
  }
}
