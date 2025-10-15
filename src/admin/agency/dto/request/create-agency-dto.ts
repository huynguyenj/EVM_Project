import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgencyDto {
  @ApiProperty({ example: 'EVM Agent 1' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsNotEmpty()
  location: string;
  @ApiProperty({ example: 'Central Park, Washinton' })
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty({ example: 'agent1@gmail.com' })
  @IsString()
  @IsNotEmpty()
  contactInfo: string;
}
