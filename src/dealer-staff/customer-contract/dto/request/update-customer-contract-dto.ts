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
import { ContractPaidType, ContractStatus, ContractType } from '../../types';

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
  totalAmount?: number;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsOptional()
  depositAmount?: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createDate?: Date;

  @ApiProperty({ example: ContractPaidType.FULL })
  @IsEnum(ContractPaidType)
  @IsOptional()
  contractPaidType?: ContractPaidType;

  @ApiProperty({ example: ContractType.AT_STORE })
  @IsEnum(ContractType)
  @IsOptional()
  contractType?: ContractType;

  @ApiProperty({ example: ContractStatus.PENDING })
  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  electricMotorbikeId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  colorId?: number;
}
