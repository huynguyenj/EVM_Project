import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dto';
import { ManagerQueries } from './decorator';
import { type ManagerQuery } from './types';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('manager/staff')
@Roles(Role.DEALER_MANAGER)
export class StaffController {
  constructor(private staffService: StaffService) {}
  @Post()
  async createStaff(@Body() staffInput: CreateStaffDto) {
    const newStaff = await this.staffService.createStaff(staffInput);
    return {
      data: newStaff,
      message: 'Create staff successfully',
    };
  }

  @Get('role')
  async getRoleDealerStaff() {
    const roles = await this.staffService.getRoleStaff();
    return { data: roles, message: 'Get role successfully' };
  }

  @Get(':agencyId')
  async getAllStaffAgency(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @ManagerQueries() managerQueries: ManagerQuery,
  ) {
    const staffList = await this.staffService.getAllStaffAgency(
      agencyId,
      managerQueries,
    );
    return {
      data: staffList,
      message: 'Get all staff successfully',
    };
  }

  @Patch(':staffId')
  async updateStaffInfo(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Body() staffInfo: UpdateStaffDto,
  ) {
    const updatedStaff = await this.staffService.updateStaffInfoAgency(
      staffId,
      staffInfo,
    );
    return {
      data: updatedStaff,
      message: 'Update staff information successfully',
    };
  }

  @Delete(':staffId')
  async deleteStaff(@Param('staffId', ParseIntPipe) staffId: number) {
    await this.staffService.deleteStaffAgency(staffId);
    return {
      message: 'Delete staff successfully',
    };
  }
}
