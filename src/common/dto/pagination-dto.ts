import { ApiResponseProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiResponseProperty({ example: 1, type: Number })
  page: number;
  @ApiResponseProperty({ example: 5, type: Number })
  limit: number;
  @ApiResponseProperty({ example: 15, type: Number })
  totalItems: number;
}
