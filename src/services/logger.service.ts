import { LoggerService, ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(message: any, ...optionalParams: [...any, string?]): void {
    console.log('log from logger!!!!!');
    // console.log(mess);
    super.log(message, ...optionalParams);
  }
  error(mess: any) {
    console.log('error from logger!!!!!');
    console.log(mess);
  }
  warn(mess: any) {
    console.log('warn from logger!!!!!');
    console.log(mess);
  }
}
