import { ApiResponseProperty } from '@nestjs/swagger';

export class RoleStaffResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'Dealer Staff' })
  roleName: string;
}
