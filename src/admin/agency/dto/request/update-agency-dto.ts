import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAgencyDto {
  @ApiProperty({ example: 'EVM Agent 1' })
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsOptional()
  location?: string;
  @ApiProperty({ example: 'Central Park, Washinton' })
  @IsString()
  @IsOptional()
  address?: string;
  @ApiProperty({ example: 'agent1@gmail.com' })
  @IsString()
  @IsOptional()
  contactInfo?: string;
}
