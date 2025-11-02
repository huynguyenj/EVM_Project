import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerContractDocumentsDto {
  @ApiProperty({ example: 'CCCD image' })
  @IsNotEmpty()
  @IsString()
  documentType: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  documentImages: any;
}
