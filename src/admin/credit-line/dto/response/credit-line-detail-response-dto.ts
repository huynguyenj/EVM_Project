import { AgencyResponseDto } from 'src/admin/agency/dto';
import { CreditLineResponseDto } from './credit-line-response-dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class CreditLineDetailResponse extends CreditLineResponseDto {
  @ApiResponseProperty({ type: AgencyResponseDto })
  agency: AgencyResponseDto;
}
