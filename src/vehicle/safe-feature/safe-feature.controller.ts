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
import { SafeFeatureService } from './safe-feature.service';
import {
  CreateSafeFeatureDto,
  SafeFeatureResponseDto,
  UpdateSafeFeatureDto,
} from './dto';
import { ApiResponseDocument } from 'src/common/decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
@ApiBearerAuth('access-token')
@Roles(Role.ADMIN, Role.EVM_STAFF)
@Controller('safe-feature')
export class SafeFeatureController {
  constructor(private safeFeatureService: SafeFeatureService) {}

  @Post(':vehicleId')
  @ApiOperation({ summary: 'Create safe feature' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    SafeFeatureResponseDto,
    'Create safe feature success!',
  )
  async createAppearance(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createSafeFeatureDto: CreateSafeFeatureDto,
  ) {
    const createdSafeFeature = await this.safeFeatureService.createSafeFeature(
      vehicleId,
      createSafeFeatureDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Safe feature created successfully',
      data: createdSafeFeature,
    };
  }

  @Get(':vehicleId')
  @ApiOperation({ summary: 'Get safe feature detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    SafeFeatureResponseDto,
    'Get safe feature success!',
  )
  async getSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const feature =
      await this.safeFeatureService.getSafeFeaturesByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Feature retrieved successfully',
      data: feature,
    };
  }

  @Patch(':vehicleId')
  @ApiOperation({ summary: 'Update safe feature' })
  @ApiResponseDocument(
    HttpStatus.OK,
    SafeFeatureResponseDto,
    'Update safe feature success!',
  )
  async updateSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateAppearanceDto: UpdateSafeFeatureDto,
  ) {
    const updatedSafeFeature =
      await this.safeFeatureService.updateSafeFeaturesByVehicleId(
        vehicleId,
        updateAppearanceDto,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Safe updated successfully',
      data: updatedSafeFeature,
    };
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete safe feature' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete success!')
  async deleteSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.safeFeatureService.deleteSafeFeaturesByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Safe feature deleted successfully',
      data: {},
    };
  }
}
