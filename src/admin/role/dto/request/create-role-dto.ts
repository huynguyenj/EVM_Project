import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Must be a string!' })
  @IsNotEmpty({ message: 'Must not empty!' })
  @ApiProperty({ default: 'Admin', description: 'Role name' })
  roleName: string;
}
