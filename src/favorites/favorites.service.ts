import { Inject, Injectable, forwardRef, OnModuleInit } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesResponse } from './types';
import { ErrMess } from 'src/services/errMessages';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class FavoritesService implements OnModuleInit {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  private artistService: ArtistsService;

  onModuleInit() {
    this.artistService = this.moduleRef.get(ArtistsService, { strict: false });
  }
  constructor(
    private moduleRef: ModuleRef,
    @Inject(forwardRef(() => AlbumsService))
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
    return {
      artists: this.favorites.artists.map((id) =>
        this.artistService.findOne(id),
      ),
      albums: this.favorites.albums.map((id) => this.albService.findOne(id)),
      tracks: this.favorites.tracks.map((id) => this.tracksService.findOne(id)),
    };
  }

  removeFromFavs(memberType: keyof Favorites, id: string) {
    if (!this.checkIncludes(memberType, id)) {
      return false;
    }
    const favIdx = this.favorites[memberType].findIndex((_id) => _id === id);
    this.favorites[memberType].splice(favIdx, 1);
    return true;
  }
}
