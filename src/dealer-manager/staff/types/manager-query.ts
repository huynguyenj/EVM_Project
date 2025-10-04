import { PaginationRequestQuery } from 'src/common/types';

export interface ManagerQuery extends PaginationRequestQuery {
  role: string | undefined;
}
