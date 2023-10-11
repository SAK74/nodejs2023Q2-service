import { OmitType } from '@nestjs/swagger';
import { Album } from '../entities/album.entity';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto extends OmitType(Album, ['id']) {
  @IsDefined() @IsString() name: string;
  @IsDefined() @IsNumber() year: number;
  @IsOptional() @IsString() @IsUUID() artistId: string | null;
}
