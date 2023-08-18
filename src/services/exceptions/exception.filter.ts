import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CustomLogger } from '../logger/logger.service';
import { getReasonPhrase } from 'http-status-codes';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    let respBody: string | object = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
    };
    if (exception instanceof HttpException) {
      const exResp = exception.getResponse();
      if (typeof exResp === 'string') {
        respBody = {
          statusCode: exception.getStatus(),
          message: exResp,
        };
      } else {
        respBody = exResp;
      }
    }
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // const message =
    //   exception instanceof HttpException
    //     ? exception.getResponse()
    //     : 'test message';
    // console.log(message);
    httpAdapter.reply(context.getResponse(), respBody, httpStatus);
  }
  constructor(
    private logger: CustomLogger,
    private httpAdapterHost: HttpAdapterHost,
  ) {
    logger.setContext(CustomExceptionFilter.name);
  }
}
