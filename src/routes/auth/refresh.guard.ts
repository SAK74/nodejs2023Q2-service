import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { PayloadType } from './types';
import { getReasonPhrase } from 'http-status-codes';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromBody(request);
    if (!token) {
      throw new UnauthorizedException('No jwt provided!');
    }
    try {
      const payload: PayloadType = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });
      request['userLogin'] = payload.userLogin;
    } catch (err) {
      let mess = getReasonPhrase(HttpStatus.FORBIDDEN);
      if ((err as Error).name === 'JsonWebTokenError') {
        mess = (err as Error).message;
      }
      throw new ForbiddenException(mess);
    }
    return true;
  }
}

const extractTokenFromBody = (
  req: Request<ParamsDictionary, any, { refreshToken?: string }>,
) => {
  return req.body?.refreshToken;
};
