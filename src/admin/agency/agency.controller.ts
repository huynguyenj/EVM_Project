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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { AgencyService } from './agency.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  AgencyQueries,
  AgencyResponseDto,
  CreateAgencyDto,
  UpdateAgencyDto,
} from './dto';
import { AgencyQuery } from './decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';

@ApiBearerAuth('access-token')
@ApiTags('Admin - Agency Management')
@Roles(Role.ADMIN)
@Controller('agency')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create agency' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    AgencyResponseDto,
    'Create agency successfully!',
  )
  async createAgency(@Body() createAgencyDto: CreateAgencyDto) {
    const data = await this.agencyService.createAgency(createAgencyDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create agency successfully',
      data: data,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get agency list' })
  @ApiQueriesAndPagination(
    { name: 'location', example: 'china', required: false },
    { name: 'address', example: 'Bejing', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    AgencyResponseDto,
    'Get list agencies successfully!',
  )
  async getListAgency(@AgencyQuery() agencyQueries: AgencyQueries) {
    const dataList = await this.agencyService.getListAgency(agencyQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list agencies successfully',
      data: dataList.dataList,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get(':agencyId')
  @ApiOperation({ summary: 'Get agency detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    AgencyResponseDto,
    'Get agency detail successfully!',
  )
  async getAgencyDetail(@Param('agencyId', ParseIntPipe) agencyId: number) {
    const data = await this.agencyService.getAgencyDetail(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get agency detail successfully!',
      data: data,
    };
  }

  @Patch(':agencyId')
  @ApiOperation({ summary: 'Update agency' })
  @ApiResponseDocument(
    HttpStatus.OK,
    UpdateAgencyDto,
    'Update agency successfully!',
  )
  async updateAgency(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @Body() agencyUpdateDto: UpdateAgencyDto,
  ) {
    const updatedData = await this.agencyService.updateAgency(
      agencyId,
      agencyUpdateDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update agency successfully!',
      data: updatedData,
    };
  }

  @Delete(':agencyId')
  @ApiOperation({ summary: 'Delete agency' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete agency successfully!')
  async deleteAgency(@Param('agencyId', ParseIntPipe) agencyId: number) {
    await this.agencyService.deleteAgency(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete agency successfully!',
      data: {},
    };
  }
}
