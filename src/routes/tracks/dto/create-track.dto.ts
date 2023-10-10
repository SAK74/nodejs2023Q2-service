import { Track } from '../entities/track.entity';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { OmitType } from '@nestjs/swagger';

export class CreateTrackDto extends OmitType(Track, ['id']) {
  @IsDefined() @IsString() name: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;
  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string | null;
  @IsDefined() @IsNumber() duration: number;
}
