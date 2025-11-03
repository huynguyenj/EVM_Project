import { PaginationRequestQuery } from 'src/common/types';
import { BatchesStatus } from '../../types';

export class BatchesQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  status?: BatchesStatus;
}
