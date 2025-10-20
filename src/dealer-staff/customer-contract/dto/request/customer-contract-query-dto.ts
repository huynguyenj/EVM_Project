import { PaginationRequestQuery } from 'src/common/types';
import { ContractStatus, ContractType } from '../../types';

export class CustomerContractQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  customerId?: number;
  staffId?: number;
  status?: ContractStatus;
  contractType?: ContractType;
}
