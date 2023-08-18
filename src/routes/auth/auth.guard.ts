import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/decorators/public.decorator';

interface PayloadType {
  userId: string;
  userLogin: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = extractTocken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: PayloadType = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request['login'] = payload.userLogin;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

const extractTocken = (req: Request) => {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
