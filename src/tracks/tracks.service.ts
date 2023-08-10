import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
// import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];
  constructor(
    // @Inject(forwardRef(() => FavoritesService))
    // private favService: FavoritesService,
    private prisma: PrismaService,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(_id: string) {
    return this.prisma.track.findUniqueOrThrow({ where: { id: _id } });
  }

  update(_id: string, data: CreateTrackDto) {
    return this.prisma.track.update({ where: { id: _id }, data });
  }

  remove(_id: string) {
    //   this.favService.removeFromFavs('tracks', _id);
    return this.prisma.track.delete({ where: { id: _id } });
  }

  removeArtistIdFromTracks(_artistId: string) {
    this.tracks = [
      ...this.tracks.map((track) => {
        if (_artistId === track.artistId) {
          track.artistId = null;
        }
        return track;
      }),
    ];
  }

  removeAlbumFromTracks(_albumId: string) {
    this.tracks = [
      ...this.tracks.map((track) => {
        if (_albumId === track.albumId) {
          track.albumId = null;
        }
        return track;
      }),
    ];
  }
}
