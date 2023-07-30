import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { randomUUID } from 'crypto';
import { ErrMess } from 'src/services/errMessages';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  artists: Artist[] = [];
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favService: FavoritesService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const _artist: Artist = { ...createArtistDto, id: randomUUID() };
    this.artists.push(_artist);
    return _artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(_id: string) {
    return this.artists.find(({ id }) => id === _id);
  }

  update(_id: string, data: CreateArtistDto) {
    let _artistIdx: number;
    if ((_artistIdx = this.artists.findIndex(({ id }) => id === _id)) !== -1) {
      this.artists[_artistIdx] = { ...this.artists[_artistIdx], ...data };
      return this.artists[_artistIdx];
    }
    throw new Error(ErrMess.NOT_EXIST);
  }

  remove(_id: string) {
    if (this.artists.some(({ id }) => id === _id)) {
      this.favService.removeFromFavs('artists', _id);
      this.artists = [...this.artists.filter(({ id }) => id !== _id)];
      return true;
    }
    return false;
  }
}
