import { Request } from 'express';
import { JwtPayload } from './jwt.payload';

export interface AuthenticationRequest extends Request {
  user: JwtPayload;
}
