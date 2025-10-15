import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequestQuery } from 'src/common/types';

export class StaffQuery implements PaginationRequestQuery {
  @ApiProperty({ example: 1, description: 'Items limit per page' })
  limit: number;
  @ApiProperty({ example: 1, description: 'Page number' })
  page: number;
  @ApiPropertyOptional({ example: 'admin', description: 'Filter by role' })
  role: string | undefined;
}
