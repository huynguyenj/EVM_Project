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
import { SafeFeatureService } from './safe-feature.service';
import { CreateSafeFeatureDto, UpdateSafeFeatureDto } from './dto';

@Controller('safe-feature')
export class SafeFeatureController {
  constructor(private safeFeatureService: SafeFeatureService) {}

  @Post(':vehicleId')
  async createAppearance(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createSafeFeatureDto: CreateSafeFeatureDto,
  ) {
    const createdSafeFeature = await this.safeFeatureService.createSafeFeature(
      vehicleId,
      createSafeFeatureDto,
    );
    return {
      message: 'Safe feature created successfully',
      data: createdSafeFeature,
    };
  }

  @Get(':vehicleId')
  async getSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const feature =
      await this.safeFeatureService.getSafeFeaturesByVehicleId(vehicleId);
    return {
      message: 'Feature retrieved successfully',
      data: feature,
    };
  }

  @Patch(':vehicleId')
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
      message: 'Safe updated successfully',
      data: updatedSafeFeature,
    };
  }

  @Delete(':vehicleId')
  async deleteSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.safeFeatureService.deleteSafeFeaturesByVehicleId(vehicleId);
    return {
      message: 'Safe feature deleted successfully',
    };
  }
}
