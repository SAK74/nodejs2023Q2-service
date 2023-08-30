import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FavsTypeValidatePipe implements PipeTransform {
  transform(val: any) {
    if (val !== 'artist' && val !== 'album' && val !== 'track') {
      throw new HttpException(
        `Route ${val} don't exist!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return val;
  }
}
