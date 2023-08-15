import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { CustomLogger } from 'src/services/logger.service';

@Injectable()
export class RequestLogger implements NestMiddleware {
  constructor(private logger: CustomLogger) {
    logger.setContext(RequestLogger.name);
  }
  use(req: IncomingMessage, res: ServerResponse, next: (error?: any) => void) {
    // here should be logger used
    console.log('Middleware used!');
    // console.log(`Request url: ${req.url}`);
    this.logger.log(`Request url: ${req.url}`);
    const startTime = Date.now();
    res.on('close', () => {
      // this.logger.setContext('Response');
      this.logger.log(`Response done in ${Date.now() - startTime} ms`);
    });
    next();
  }
}

export const requestLogger = (
  req: IncomingMessage,
  res: ServerResponse,

  next: (error?: any) => void,
) => {
  console.log('Middleware used!');
  console.log(`Request url: ${req.url}`);
  // @Inject(CustomLogger)((target,some)=>{})

  next();
};
