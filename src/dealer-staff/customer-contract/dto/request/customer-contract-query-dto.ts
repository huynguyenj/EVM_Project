import { PaginationRequestQuery } from 'src/common/types';
import { ContractPaidType, ContractStatus } from '../../types';

export class CustomerContractQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  customerId?: number;
  staffId?: number;
  status?: ContractStatus;
  contractType?: ContractPaidType;
  sort: string;
}
