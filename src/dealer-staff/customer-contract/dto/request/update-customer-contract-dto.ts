import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ContractPaidType, ContractStatus } from '../../types';

export class UpdateCustomerContractDto {
  @ApiProperty({ example: 'Contract for motorbike with customer John' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Contract create for motorbike' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 155000 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  finalPrice?: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  signDate?: Date;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deliveryDate?: Date;

  @ApiProperty({ example: ContractPaidType.FULL })
  @IsEnum(ContractPaidType)
  @IsOptional()
  contractPaidType?: ContractPaidType;

  @ApiProperty({ example: ContractStatus.PENDING })
  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;
}
