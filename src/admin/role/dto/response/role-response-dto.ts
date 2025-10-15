import { ApiResponseProperty } from '@nestjs/swagger';

export class RoleResponse {
  @ApiResponseProperty({ example: 'Admin' })
  roleName: string;

  @ApiResponseProperty({ example: true })
  isActive: boolean;

  @ApiResponseProperty({ example: false })
  isDeleted: boolean;

  @ApiResponseProperty({ example: 1 })
  id: number;
}
