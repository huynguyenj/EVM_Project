import { PaginationRequestQuery } from 'src/common/types';

export interface StaffQuery extends PaginationRequestQuery {
  role: string | undefined;
}
