import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import {
  CreateStaffDto,
  RoleStaffResponseDto,
  StaffResponseDto,
  UpdateStaffDto,
} from './dto';
import { ManagerQueries } from './decorator';
import { type ManagerQuery } from './types';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';

@ApiBearerAuth('access-token')
@ApiTags('Dealer Manager Staff - Staff Management')
@Controller('manager/staff')
@Roles(Role.DEALER_MANAGER)
export class StaffController {
  constructor(private staffService: StaffService) {}
  @Post()
  @ApiOperation({ summary: 'Create staff by manager' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    CreateStaffDto,
    'Create staff successfully!',
  )
  async createStaff(@Body() staffInput: CreateStaffDto) {
    const newStaff = await this.staffService.createStaff(staffInput);
    return {
      statusCode: HttpStatus.CREATED,
      data: newStaff,
      message: 'Create staff successfully',
    };
  }

  @Get('role')
  @ApiOperation({ summary: 'Get role dealer staff by manager' })
  @ApiResponseDocument(
    HttpStatus.OK,
    RoleStaffResponseDto,
    'Get role dealer staff successfully!',
  )
  async getRoleDealerStaff() {
    const roles = await this.staffService.getRoleDealerStaff();
    return {
      statusCode: HttpStatus.OK,
      data: roles,
      message: 'Get role dealer staff successfully',
    };
  }

  @Get(':agencyId')
  @ApiQueriesAndPagination()
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    StaffResponseDto,
    'Get list staffs success!',
  )
  async getAllStaffAgency(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @ManagerQueries() managerQueries: ManagerQuery,
  ) {
    const staffList = await this.staffService.getAllStaffAgency(
      agencyId,
      managerQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all staff successfully',
      data: staffList.staffList,
      paginationInfo: staffList.paginationInfo,
    };
  }

  @Patch(':staffId')
  @ApiOperation({ summary: 'Update dealer staff information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    StaffResponseDto,
    'Update staff information successfully!',
  )
  async updateStaffInfo(
    @Param('staffId', ParseIntPipe) staffId: number,
    @Body() staffInfo: UpdateStaffDto,
  ) {
    const updatedStaff = await this.staffService.updateStaffInfoAgency(
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
  @ApiOperation({ summary: 'Delete dealer staff information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete staff information successfully!',
  )
  async deleteStaff(@Param('staffId', ParseIntPipe) staffId: number) {
    await this.staffService.deleteStaffAgency(staffId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete staff successfully',
      data: {},
    };
  }
}
