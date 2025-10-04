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
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { StaffService } from './staff.service';
import { AdminQueries } from './decorator';
import { type StaffQuery } from './types';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('admin/staff')
@Roles(Role.ADMIN)
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post()
  async createStaff(@Body() createStaffDto: CreateAccountDto) {
    const newStaff = await this.staffService.createStaff(createStaffDto);
    return {
      data: newStaff,
      message: 'Create staff account successfully',
    };
  }

  @Get()
  async getAllStaffAdmin(@AdminQueries() staffQuery: StaffQuery) {
    const staffList = await this.staffService.getAllStaffAdmin(staffQuery);
    return {
      data: staffList,
      message: 'Get all staff successfully',
    };
  }

  @Patch(':staffId')
  async updateStaffInfoAdmin(
    @Param('staffId') staffId: number,
    @Body() staffInfo: UpdateAccountDto,
  ) {
    const updatedStaff = await this.staffService.updateStaffInfoAdmin(
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
    await this.staffService.deleteStaffAdmin(staffId);
    return {
      message: 'Delete staff successfully',
    };
  }
}
