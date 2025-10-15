import { ApiResponseProperty } from '@nestjs/swagger';

export class WarehouseResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 'USA' })
  location: string;

  @ApiResponseProperty({ example: 'Washinton New York' })
  address: string;

  @ApiResponseProperty({ example: 'Warehouse 1' })
  name: string;

  @ApiResponseProperty({ example: true })
  isActive: boolean;
}
