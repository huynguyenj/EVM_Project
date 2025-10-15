import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CreateRoleDto, RoleResponse } from './dto';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDocument } from 'src/common/decorator/swagger-decorator/api.response.document.decorator';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiResponseDocumentArray } from 'src/common/decorator';

@Controller('role')
@ApiBearerAuth('access-token')
@ApiTags('Admin - Role Management')
@Roles(Role.ADMIN)
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Post('create-role')
  @ApiOperation({ summary: 'Create role for system' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    CreateRoleDto,
    'Create role successfully!',
  )
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const roleData = await this.roleService.createRole(createRoleDto.roleName);
    const response: RoleResponse = roleData;
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create role successfully!',
      data: response,
    };
  }
  @Get('all-role')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    RoleResponse,
    'Get all roles success!',
  )
  async getAllRoles() {
    const roles = await this.roleService.getAllRoles();
    const response: RoleResponse[] = roles;
    return {
      statusCode: HttpStatus.OK,
      message: 'Get all roles successfully!',
      data: response,
    };
  }
}
