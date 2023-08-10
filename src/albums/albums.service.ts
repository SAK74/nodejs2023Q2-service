import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
// import { randomUUID } from 'crypto';
// import { ErrMess } from 'src/services/errMessages';
// import { FavoritesService } from 'src/favorites/favorites.service';
// import { TracksService } from 'src/tracks/tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];
  constructor(
    // @Inject(forwardRef(() => FavoritesService))
    // private favsService: FavoritesService,
    // private trackServ: TracksService,
    private prisma: PrismaService,
  ) {}
  create(data: CreateAlbumDto) {
    return this.prisma.album.create({ data });
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  findOne(_id: string) {
    return this.prisma.album.findUniqueOrThrow({ where: { id: _id } });
  }

  update(_id: string, data: CreateAlbumDto) {
    return this.prisma.album.update({ where: { id: _id }, data });
  }

  remove(_id: string) {
    // if (this.albums.some(({ id }) => id === _id)) {
    //   this.favsService.removeFromFavs('albums', _id);
    //   this.trackServ.removeAlbumFromTracks(_id);
    //   this.albums = [...this.albums.filter(({ id }) => id !== _id)];
    //   return true;
    // }
    // return false;

    //   this.favsService.removeFromFavs('albums', _id);
    //   this.trackServ.removeAlbumFromTracks(_id);
    return this.prisma.album.delete({ where: { id: _id } });
  }

  removeArtistIdFromAlbums(_artistId: string) {
    this.albums = [
      ...this.albums.map((album) => {
        if (_artistId === album.artistId) {
          album.artistId = null;
        }
        return album;
      }),
    ];
  }
}
