import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FavsTypeValidatePipe implements PipeTransform {
  transform(val: any, meta: ArgumentMetadata) {
    if (val !== 'artist' && val !== 'album' && val !== 'track') {
      throw new HttpException(`Route ${val} not exist!`, HttpStatus.NOT_FOUND);
    }
    return val;
  }
}
