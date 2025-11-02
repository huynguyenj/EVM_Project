import { PaginationRequestQuery } from 'src/common/types';
import { DepositStatus } from '../../types';

export class DepositQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  status?: DepositStatus;
}
