import { Request } from 'express';

export interface PayloadType {
  userId: string;
  userLogin: string;
}

export interface RequestWithLogin extends Request {
  userLogin: string;
}
