import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStaff() {
    // const data = await this.staffService.createStaff(createStaffDto);
    // return {
    //   data: data,
    //   message: 'Create staff successfully',
    // };
  }
}
