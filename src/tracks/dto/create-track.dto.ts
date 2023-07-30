import { PartialType } from '@nestjs/mapped-types';
import { Track } from '../entities/track.entity';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto extends PartialType(Track) {
  @IsDefined() @IsString() name: string;
  @IsOptional() @IsString() artistId: string | null;
  @IsOptional() @IsString() albumId: string | null;
  @IsDefined() @IsNumber() duration: number;
}
