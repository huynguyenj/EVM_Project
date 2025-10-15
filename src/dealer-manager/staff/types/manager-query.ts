import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestQuery } from 'src/common/types';

export class ManagerQuery implements PaginationRequestQuery {
  @ApiProperty({ example: 1, description: 'Items limit per page' })
  limit: number;
  @ApiProperty({ example: 1, description: 'Page number' })
  page: number;
}
