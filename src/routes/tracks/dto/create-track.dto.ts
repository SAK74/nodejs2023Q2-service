import { PartialType } from '@nestjs/mapped-types';
import { Track } from '../entities/track.entity';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto extends PartialType(Track) {
  @IsDefined() @IsString() name: string;
  @IsOptional() @IsString() @IsUUID() artistId: string | null;
  @IsOptional() @IsString() @IsUUID() albumId: string | null;
  @IsDefined() @IsNumber() duration: number;
}
