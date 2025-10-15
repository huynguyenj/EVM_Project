import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSafeFeatureDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ABS' })
  brake: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Smart Lock' })
  lock: string;
}
