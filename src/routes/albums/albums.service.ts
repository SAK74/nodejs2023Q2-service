import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];
  constructor(private prisma: PrismaService) {}
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
