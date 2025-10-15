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
import { AppearanceService } from './appearance.service';
import {
  AppearanceResponseDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDocument } from 'src/common/decorator';

@ApiBearerAuth('access-token')
@Controller('appearance')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class AppearanceController {
  constructor(private appearanceService: AppearanceService) {}

  @Post(':vehicleId')
  @ApiOperation({ summary: 'Create appearance for a vehicle' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    AppearanceResponseDto,
    'Create appearance successfully!',
  )
  async createAppearance(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createAppearanceDto: CreateAppearanceDto,
  ) {
    const createdAppearance = await this.appearanceService.createAppearance(
      vehicleId,
      createAppearanceDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Appearance created successfully',
      data: createdAppearance,
    };
  }

  @Get(':vehicleId')
  @ApiOperation({ summary: 'Get appearance by vehicle ID' })
  @ApiResponseDocument(
    HttpStatus.OK,
    AppearanceResponseDto,
    'Get appearance successfully!',
  )
  async getAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const appearance =
      await this.appearanceService.getAppearanceByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Appearance retrieved successfully',
      data: appearance,
    };
  }

  @Patch(':vehicleId')
  @ApiOperation({ summary: 'Update appearance by vehicle ID' })
  @ApiResponseDocument(
    HttpStatus.OK,
    AppearanceResponseDto,
    'Update successfully!',
  )
  async updateAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ) {
    const updatedAppearance =
      await this.appearanceService.updateAppearanceByVehicleId(
        vehicleId,
        updateAppearanceDto,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Appearance updated successfully',
      data: updatedAppearance,
    };
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete appearance by vehicle ID' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete appearance success!')
  async deleteAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.appearanceService.deleteAppearanceByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Appearance deleted successfully',
      data: {},
    };
  }
}
