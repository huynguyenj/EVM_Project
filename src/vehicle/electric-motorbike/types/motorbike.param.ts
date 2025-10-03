import { PaginationRequestQuery } from 'src/types';

export interface MotorbikeRequestQuery extends PaginationRequestQuery {
  model: string | undefined;
  makeFrom: string | undefined;
}
