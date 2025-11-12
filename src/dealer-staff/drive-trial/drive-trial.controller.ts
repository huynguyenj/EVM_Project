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
  SetMetadata,
} from '@nestjs/common';
import { DriveTrialService } from './drive-trial.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateDriveTrailDto,
  DriveTrailResponse,
  DriveTrialDetailResponse,
  DriveTrialQueries,
  UpdateDriveTrailDto,
} from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { DriveTrailStatus } from './types';
import { DriveTrailQuery } from './decorators';

@Controller('drive-trial')
@ApiTags('Booking drive trial for user & Manage drive trial for Dealer Staff')
@ApiBearerAuth('access-token')
export class DriveTrialController {
  constructor(private driveTrialService: DriveTrialService) {}

  @Post('public/booking')
  @ApiOperation({ summary: 'Booking drive trial for user' })
  @SetMetadata('public', true)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    DriveTrailResponse,
    'Booking drive success',
  )
  async createBookingDriveTrial(@Body() createDriveTrial: CreateDriveTrailDto) {
    const createdData =
      await this.driveTrialService.createDriveTrial(createDriveTrial);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Booking drive success',
      data: createdData,
    };
  }

  @Get('list/:agencyId')
  @ApiOperation({ summary: 'Get list drive trial' })
  @Roles(Role.DEALER_STAFF)
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    DriveTrailResponse,
    'Get list drive trial success',
  )
  @ApiQueriesAndPagination(
    { name: 'fullname', example: 'Nguyen Van A', required: false },
    { name: 'phone', example: '047979789', required: false },
    { name: 'email', example: 'nguyenvana@gmail.com', required: false },
    { name: 'status', example: DriveTrailStatus.PENDING, required: false },
  )
  async getAllListDriveTrial(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @DriveTrailQuery() driveTrialQueries: DriveTrialQueries,
  ) {
    const listData = await this.driveTrialService.getDriveTrialList(
      agencyId,
      driveTrialQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list drive trials success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:bookingId')
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Get detail drive trial' })
  @ApiResponseDocument(
    HttpStatus.OK,
    DriveTrialDetailResponse,
    'Get booking drive trial detail success',
  )
  async getBookingDriveTrailDetail(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ) {
    const data = await this.driveTrialService.getDriveTrialDetail(bookingId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get booking drive trial detail success',
      data: data,
    };
  }

  @Patch(':bookingId')
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Update drive trial' })
  @ApiResponseDocument(
    HttpStatus.OK,
    DriveTrailResponse,
    'Update drive trial success',
  )
  async updateBookingDriveTrial(
    @Param('bookingId', ParseIntPipe) bookingId: number,
    @Body() updateBookingDriveTrialDto: UpdateDriveTrailDto,
  ) {
    const updatedData = await this.driveTrialService.updateDriveTrial(
      bookingId,
      updateBookingDriveTrialDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update drive trial success',
      data: updatedData,
    };
  }

  @Delete(':bookingId')
  @Roles(Role.DEALER_STAFF)
  @ApiOperation({ summary: 'Delete drive trial' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete drive trial success')
  async deleteBookingDriveTrial(
    @Param('bookingId', ParseIntPipe) bookingId: number,
  ) {
    await this.driveTrialService.deleteDriveTrial(bookingId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete drive trial success',
      data: {},
    };
  }
}
