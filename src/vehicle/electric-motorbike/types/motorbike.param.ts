import { PaginationRequestQuery } from 'src/common/types';

export interface MotorbikeRequestQuery extends PaginationRequestQuery {
  model: string | undefined;
  makeFrom: string | undefined;
}
