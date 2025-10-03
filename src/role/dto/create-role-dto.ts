import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Must be a string!' })
  @IsNotEmpty({ message: 'Must not empty!' })
  roleName: string;
}
