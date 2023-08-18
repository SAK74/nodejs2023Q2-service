import {
  LoggerService,
  ConsoleLogger,
  Injectable,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(mess: any, ...optionalParams: [...any, string?]): void {
    super.log(mess, ...optionalParams);
  }
  error(mess: any, ...optionalParams: [...any, string?]): void {
    super.error(mess, ...optionalParams);
  }
  warn(mess: any, ...optionalParams: [...any, string?]): void {
    super.warn(mess, ...optionalParams);
  }
}
