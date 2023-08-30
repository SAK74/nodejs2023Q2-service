import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLogger } from 'src/services/logger/logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLogger implements NestMiddleware {
  constructor(private logger: CustomLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.setContext('Request');
    this.logger.log(
      `url: ${req.url}, method: ${req.method}, query params: ${JSON.stringify(
        req.query,
      )}, body: ${JSON.stringify(req.body)}`,
    );
    const startTime = Date.now();
    res.on('close', () => {
      this.logger.setContext('Response');
      this.logger.log(
        `status: ${res.statusCode}, done in ${Date.now() - startTime} ms`,
      );
    });
    next();
  }
}
