import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Brushless DC', description: 'Type of motor' })
  motorType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '80km/h', description: 'Speed limit of the vehicle' })
  speedLimit: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2, description: 'Maximum capacity of the vehicle' })
  maximumCapacity: number;
}
