import { ApiResponseProperty } from '@nestjs/swagger';
import { AgencyStatus } from '../../types';

export class AgencyResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'EVM Agent 1' })
  name: string;
  @ApiResponseProperty({ example: 'USA' })
  location: string;
  @ApiResponseProperty({ example: 'Central Park, Washinton' })
  address: string;
  @ApiResponseProperty({ example: 'agent1@gmail.com' })
  contactInfo: string;
  @ApiResponseProperty({ example: 'active' })
  status: AgencyStatus;
}
