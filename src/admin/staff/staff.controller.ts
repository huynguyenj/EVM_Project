import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAccountDto, ResponseAccountDto, UpdateAccountDto } from './dto';
import { StaffService } from './staff.service';
import { AdminQueries } from './decorator';
import { type StaffQuery } from './types';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiResponseDocument } from 'src/common/decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiQueriesAndPagination } from 'src/common/decorator/swagger-decorator/api.query.pagination';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';

@ApiBearerAuth('access-token')
@Controller('admin/staff')
@ApiTags('Admin - Staff Management')
@Roles(Role.ADMIN)
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create staff account for admin' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ResponseAccountDto,
    'Create account successfully!',
  )
  async createStaff(@Body() createStaffDto: CreateAccountDto) {
    const newStaff = await this.staffService.createStaff(createStaffDto);
    const response: ResponseAccountDto = {
      ...newStaff,
      role: newStaff?.role.map((item) => item.role.roleName) ?? [],
    };
    return {
      statusCode: HttpStatus.CREATED,
      data: response,
      message: 'Create staff account successfully',
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get staff list' })
  @ApiQueriesAndPagination({
    name: 'role',
    required: false,
    type: String,
    example: 'Staff',
  })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    ResponseAccountDto,
    'Get list staffs successfully!',
  )
  @HttpCode(HttpStatus.OK)
  async getAllStaffAdmin(@AdminQueries() staffQuery: StaffQuery) {
    const staffList = await this.staffService.getAllStaffAdmin(staffQuery);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all staff successfully',
      data: staffList.staffList,
      paginationInfo: staffList.paginationInfo,
    };
  }

  @Post(':staffId/assign/:agencyId')
  @ApiOperation({ summary: 'Assign staff to agency' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ResponseAccountDto,
    'Assign agency to staff successfully!',
  )
  async assignAgencyToManager(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Param('agencyId', ParseIntPipe) agencyId: number,
  ) {
    const updatedData = await this.staffService.updateAgencyForStaff(
      staffId,
      agencyId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Assign agency to staff successfully!',
      data: updatedData,
    };
  }

  @Get('detail/:staffId')
  @ApiOperation({ summary: 'Get staff information' })
  @HttpCode(200)
  @ApiResponseDocument(
    HttpStatus.OK,
    ResponseAccountDto,
    'Get staff detail successfully!',
  )
  async getStaffByIdAdmin(@Param('staffId', ParseIntPipe) staffId: number) {
    console.log(staffId);
    const staffInfo = await this.staffService.getStaffByIdAdmin(staffId);
    const response: ResponseAccountDto = {
      ...staffInfo,
      role: staffInfo?.role.map((item) => item.role.roleName) ?? [],
    };
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Get staff detail successfully',
    };
  }

  @Patch(':staffId')
  @ApiOperation({ summary: 'Update staff information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ResponseAccountDto,
    'Update successfully!',
  )
  async updateStaffInfoAdmin(
    @Param('staffId') staffId: number,
    @Body() staffInfo: UpdateAccountDto,
  ) {
    const updatedStaff = await this.staffService.updateStaffInfoAdmin(
      staffId,
      staffInfo,
    );
    return {
      statusCode: HttpStatus.OK,
      data: updatedStaff,
      message: 'Update staff information successfully',
    };
  }

  @Delete(':staffId')
  @ApiOperation({ summary: 'Delete staff' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete successfully!')
  async deleteStaff(@Param('staffId', ParseIntPipe) staffId: number) {
    await this.staffService.deleteStaffAdmin(staffId);
    return {
      message: 'Delete staff successfully',
    };
  }
}
