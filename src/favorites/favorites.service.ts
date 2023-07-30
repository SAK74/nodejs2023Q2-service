import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesResponse } from './types';
import { ErrMess } from 'src/services/errMessages';

@Injectable()
export class FavoritesService {
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  constructor(
    private artistService: ArtistsService,
    private albService: AlbumsService,
    private tracksService: TracksService,
  ) {}
  addToFavs(memberType: keyof Favorites, id: string) {
    if (!this.checkIncludes(memberType, id)) {
      throw Error(ErrMess.NOT_EXIST);
    }
    this.favorites[memberType].push(id);
  }

  private checkIncludes(member: keyof Favorites, _id: string) {
    switch (member) {
      case 'albums':
        return this.albService.findAll().some(({ id }) => id === _id);
      case 'artists':
        return this.artistService.findAll().some(({ id }) => id === _id);
      case 'tracks':
        return this.tracksService.findAll().some(({ id }) => id === _id);
      default:
        throw Error('Unknow error!');
    }
  }

  findAll(): FavoritesResponse {
    console.log('favorites: ', this.favorites);
    return {
      artists: this.favorites.artists.map((id) =>
        this.artistService.findOne(id),
      ),
      albums: this.favorites.albums.map((id) => this.albService.findOne(id)),
      tracks: this.favorites.tracks.map((id) => this.tracksService.findOne(id)),
    };
    // return this.favorites;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} favorite`;
  // }

  // update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
  //   return `This action updates a #${id} favorite`;
  // }

  removeFromFavs(memberType: keyof Favorites, id: string) {
    if (!this.checkIncludes(memberType, id)) {
      throw Error(ErrMess.NOT_EXIST);
    }
    const favIdx = this.favorites[memberType].findIndex((_id) => _id === id);
    this.favorites[memberType].splice(favIdx, 1);
    console.log('del favorites: ', this.favorites);
  }
}
