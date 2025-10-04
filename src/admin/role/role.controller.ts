import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Post('create-role')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const roleData = await this.roleService.createRole(createRoleDto.roleName);
    return {
      roleData,
    };
  }
  @Get('all-role')
  async getAllRoles() {
    const roles = await this.roleService.getAllRoles();
    return {
      data: roles,
    };
  }
}
