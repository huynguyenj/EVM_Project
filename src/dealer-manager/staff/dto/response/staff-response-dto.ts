import { ApiResponseProperty } from '@nestjs/swagger';

export class StaffResponseDto {
  @ApiResponseProperty({
    example: 1,
  })
  id: number;

  @ApiResponseProperty({
    example: 'john_doe',
  })
  username: string;

  @ApiResponseProperty({
    example: 'John Doe',
  })
  fullname: string | null;

  @ApiResponseProperty({
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiResponseProperty({
    example: '+84901234567',
  })
  phone: string | null;

  @ApiResponseProperty({
    example: '123 Nguyen Trai, Ho Chi Minh City',
  })
  address: string | null;

  @ApiResponseProperty({
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string | null;

  @ApiResponseProperty({
    example: 3,
  })
  agencyId: number | null;

  @ApiResponseProperty({
    example: '2025-10-12T14:45:00.000Z',
  })
  createAt: Date;

  @ApiResponseProperty({
    example: true,
  })
  isActive: boolean;

  @ApiResponseProperty({
    example: false,
  })
  isDeleted: boolean;
}
