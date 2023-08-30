import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Member } from './favorites.controller';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async addToFavs(memberType: Member, id: string) {
    try {
      switch (memberType) {
        case 'album':
          return await this.prisma.favAlbum.create({ data: { albumId: id } });
        case 'artist':
          return await this.prisma.favArtist.create({ data: { artistId: id } });
        case 'track':
          return await this.prisma.favTrack.create({ data: { trackId: id } });
      }
    } catch (err) {
      return false;
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    return {
      artists: (
        await this.prisma.favArtist.findMany({ include: { artist: true } })
      ).map((favs) => favs.artist),
      albums: (
        await this.prisma.favAlbum.findMany({ include: { album: true } })
      ).map((favs) => favs.album),
      tracks: (
        await this.prisma.favTrack.findMany({ include: { track: true } })
      ).map((favs) => favs.track),
    };
  }

  removeFromFavs(memberType: Member, id: string) {
    switch (memberType) {
      case 'album':
        return this.prisma.favAlbum.delete({ where: { albumId: id } });
      case 'artist':
        return this.prisma.favArtist.delete({ where: { artistId: id } });
      case 'track':
        return this.prisma.favTrack.delete({ where: { trackId: id } });
    }
  }
}
