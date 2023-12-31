import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ServerResponse } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class SetHeaderInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    // const req = ctx.switchToHttp().getRequest<IncomingMessage>();
    // req.headers['content-type'] = 'application/json';
    const resp = ctx.switchToHttp().getResponse<ServerResponse>();
    resp.setHeader('content-type', 'application/json');
    return next.handle();
  }
}
