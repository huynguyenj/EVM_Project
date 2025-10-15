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
import { ConfigurationService } from './configuration.service';
import {
  ConfigurationResponseDto,
  CreateConfigurationDto,
  UpdateConfigurationDto,
} from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDocument } from 'src/common/decorator';

@ApiBearerAuth('access-token')
@Controller('configuration')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Post(':vehicleId')
  @ApiOperation({ summary: 'Create configuration for motorbike' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ConfigurationResponseDto,
    'Create configuration successfully!',
  )
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
  @ApiOperation({ summary: 'Get configuration of motorbike' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ConfigurationResponseDto,
    'Get configuration successfully!',
  )
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
  @ApiOperation({ summary: 'Update configuration of motorbike' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ConfigurationResponseDto,
    'Update configuration successfully!',
  )
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
      statusCode: HttpStatus.OK,
      message: 'Configuration updated successfully',
      data: updatedConfiguration,
    };
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete configuration of motorbike' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete configuration successfully!',
  )
  async deleteConfigurationByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.configurationService.deleteConfigurationByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Configuration deleted successfully',
      data: {},
    };
  }
}
