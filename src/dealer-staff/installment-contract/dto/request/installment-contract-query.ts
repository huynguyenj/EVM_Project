import { PaginationRequestQuery } from 'src/common/types';
import { InstallmentContractStatus, PenaltyType } from '../../types';

export class InstallmentContractQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  customerContractId?: number;
  status?: InstallmentContractStatus;
  penaltyType?: PenaltyType;
}
