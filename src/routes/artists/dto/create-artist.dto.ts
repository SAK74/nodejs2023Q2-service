import { PartialType } from '@nestjs/mapped-types';
import { Artist } from '../entities/artist.entity';
import { IsDefined, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto extends PartialType(Artist) {
  @IsDefined() @IsString() name: string;
  @IsDefined() @IsBoolean() grammy: boolean;
}
