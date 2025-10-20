import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ContractPaidType, ContractStatus, ContractType } from '../../types';

export class CreateCustomerContractDto {
  @ApiProperty({ example: 'Contract for motorbike with customer John' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Contract create for motorbike' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 155000 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsNotEmpty()
  depositAmount: number;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createDate: Date;

  @ApiProperty({ example: ContractPaidType.FULL })
  @IsEnum(ContractPaidType)
  @IsNotEmpty()
  contractPaidType: ContractPaidType;

  @ApiProperty({ example: ContractType.AT_STORE })
  @IsEnum(ContractType)
  @IsNotEmpty()
  contractType: ContractType;

  @ApiProperty({ example: ContractStatus.PENDING })
  @IsEnum(ContractStatus)
  @IsNotEmpty()
  status: ContractStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  staffId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  agencyId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  electricMotorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  colorId: number;
}
