import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
// import { FavoritesService } from 'src/favorites/favorites.service';
// import { AlbumsService } from 'src/albums/albums.service';
// import { TracksService } from 'src/tracks/tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  artists: Artist[] = [];
  constructor(
    // @Inject(forwardRef(() => FavoritesService))
    // private favService: FavoritesService,
    // private albService: AlbumsService,
    // private trackService: TracksService,
    private prisma: PrismaService,
  ) {}
  create(data: CreateArtistDto) {
    return this.prisma.artist.create({ data });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(_id: string) {
    return this.prisma.artist.findUniqueOrThrow({ where: { id: _id } });
  }

  update(_id: string, data: CreateArtistDto) {
    return this.prisma.artist.update({ where: { id: _id }, data });
  }

  remove(_id: string) {
    // if (this.artists.some(({ id }) => id === _id)) {
    //   this.favService.removeFromFavs('artists', _id);
    //   this.albService.removeArtistIdFromAlbums(_id);
    //   this.trackService.removeArtistIdFromTracks(_id);
    //   this.artists = [...this.artists.filter(({ id }) => id !== _id)];
    //   return true;
    // }
    // return false;

    return this.prisma.artist.delete({ where: { id: _id } });
  }
}
