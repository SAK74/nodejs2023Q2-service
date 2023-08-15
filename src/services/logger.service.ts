import {
  LoggerService,
  ConsoleLogger,
  Injectable,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger implements LoggerService {
  // constructor(){
  //   super()
  // }
  log(mess: any, ...optionalParams: [...any, string?]): void {
    console.log('log from logger!!!!!');
    // console.log(mess);
    super.log(mess, ...optionalParams);
  }
  error(mess: any, ...optionalParams: [...any, string?]): void {
    console.log('error from logger!!!!!');
    super.log(mess, ...optionalParams);
    // console.log(mess);
  }
  warn(mess: any, ...optionalParams: [...any, string?]): void {
    console.log('warn from logger!!!!!');
    super.log(mess, ...optionalParams);
    // console.log(mess);
  }
}
