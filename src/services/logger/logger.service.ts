import { LoggerService, Injectable, Scope } from '@nestjs/common';
import * as path from 'path';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  private context = '';
  constructor() {
    const {
      format: { combine, printf, label, timestamp, colorize, json },
    } = winston;
    const fileFormat = combine(timestamp(), json());
    const myFormat = printf(
      (info) =>
        `${info.label} ${info.timestamp} [${info.level}]: ${info.message}`,
    );
    this.logger = winston.createLogger({
      levels: {
        DEBUG: 4,
        VERBOSE: 3,
        LOG: 2,
        WARN: 1,
        ERROR: 0,
      },
      level: process.env.LOG_LEVEL,

      format: fileFormat,
      transports: [
        new winston.transports.File({
          level: 'ERROR',
          dirname: path.resolve(__dirname, '../../../../logs'),
          filename: 'errors.log',
          maxsize: Number(process.env.MAX_FILE_SIZE) * 1000,
        }),
        new winston.transports.File({
          dirname: path.resolve(__dirname, '../../../../logs'),
          filename: 'common.log',
          maxsize: Number(process.env.MAX_FILE_SIZE) * 1000,
        }),
      ],
    });
    if (process.env.NODE_ENV === 'development') {
      this.logger.add(
        new winston.transports.Console({
          handleExceptions: true,
          handleRejections: true,
          format: combine(
            label({ label: 'Nest' }),
            colorize(),
            timestamp({}),
            myFormat,
          ),
        }),
      );
    }

    winston.addColors({
      DEBUG: 'magenta yellowBG',
      VERBOSE: 'lightblue',
      LOG: 'green',
      WARN: 'orange',
      ERROR: 'red',
    });
  }
  setContext(ctx: string) {
    this.context = ctx + ' -> ';
  }
  log(mess: any): void {
    this.logger.log('LOG', this.context + mess);
  }
  error(mess: any): void {
    this.logger.log('ERROR', this.context + mess);
  }
  warn(mess: any): void {
    this.logger.log('WARN', this.context + mess);
  }
  debug(message: any) {
    this.logger.log('DEBUG', this.context + message);
  }
  verbose(message: any) {
    this.logger.log('VERBOSE', this.context + message);
  }
}
