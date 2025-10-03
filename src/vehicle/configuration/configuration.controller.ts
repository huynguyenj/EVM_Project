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
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto, UpdateConfigurationDto } from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('configuration')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Post(':vehicleId')
  async createConfiguration(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createConfigurationDto: CreateConfigurationDto,
  ) {
    const createdConfiguration =
      await this.configurationService.createConfiguration(
        vehicleId,
        createConfigurationDto,
      );
    return {
      message: 'Configuration created successfully',
      data: createdConfiguration,
    };
  }

  @Get(':vehicleId')
  async getConfigurationByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const configuration =
      await this.configurationService.getConfigurationByVehicleId(vehicleId);
    return {
      message: 'Configuration retrieved successfully',
      data: configuration,
    };
  }

  @Patch(':vehicleId')
  async updateConfigurationByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ) {
    const updatedConfiguration =
      await this.configurationService.updateConfigurationByVehicleId(
        vehicleId,
        updateConfigurationDto,
      );
    return {
      message: 'Configuration updated successfully',
      data: updatedConfiguration,
    };
  }

  @Delete(':vehicleId')
  async deleteConfigurationByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.configurationService.deleteConfigurationByVehicleId(vehicleId);
    return {
      message: 'Configuration deleted successfully',
    };
  }
}
