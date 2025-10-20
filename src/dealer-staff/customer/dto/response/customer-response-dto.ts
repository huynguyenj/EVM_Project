import { ApiResponseProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 'john_doe' })
  name?: string;

  @ApiResponseProperty({
    example: 'john.doe@email.com',
  })
  email?: string;

  @ApiResponseProperty({
    example: '0123456789',
  })
  phone?: string;

  @ApiResponseProperty({
    example: '123 Main St',
  })
  address?: string;

  @ApiResponseProperty({
    example: '0144797af9af',
  })
  credentialId?: string;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  dob?: Date;

  @ApiResponseProperty({ example: 1 })
  agencyId: number;
}
