import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from 'src/routes/auth/decorators/public.decorator';
import { PayloadType, RequestWithLogin } from './types';

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
        ignoreExpiration: false,
      });
      request['userLogin'] = payload.userLogin;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

const extractTocken = (req: RequestWithLogin) => {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
