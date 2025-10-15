import { ApiResponseProperty } from '@nestjs/swagger';

export class ResponseAccountDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'john_doe' })
  username: string;

  @ApiResponseProperty({ example: 'John Doe' })
  fullname: string | null;

  @ApiResponseProperty({ example: 'john.doe@email.com' })
  email: string;

  @ApiResponseProperty({ example: '0123456789' })
  phone: string | null;

  @ApiResponseProperty({ example: '123 Main St' })
  address: string | null;

  @ApiResponseProperty({
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string | null;

  @ApiResponseProperty({ example: '2025-10-14T08:00:00.000Z' })
  createAt: Date;

  @ApiResponseProperty({ example: true })
  isActive: boolean;

  @ApiResponseProperty({ example: false })
  isDeleted: boolean;

  @ApiResponseProperty({ example: 1 })
  agencyId: number | null;

  @ApiResponseProperty({ example: ['Admin', 'Evm Staff'] })
  role: string[];
}
