import { PaginationRequestQuery } from 'src/types';

export interface StaffQuery extends PaginationRequestQuery {
  role: string | undefined;
}
