import { PartialType } from '@nestjs/mapped-types';
import { Album } from '../entities/album.entity';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto extends PartialType(Album) {
  @IsDefined() @IsString() name: string;
  @IsDefined() @IsNumber() year: number;
  @IsOptional() @IsString() artistId: string | null;
}
