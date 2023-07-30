import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { randomUUID } from 'crypto';
import { ErrMess } from 'src/services/errMessages';

@Injectable()
export class AlbumsService {
  albums: Album[] = [];
  create(createAlbumDto: CreateAlbumDto) {
    const _album: Album = { ...createAlbumDto, id: randomUUID() };
    this.albums.push(_album);
    return _album;
  }

  findAll() {
    return this.albums;
  }

  findOne(_id: string) {
    return this.albums.find(({ id }) => id === _id);
  }

  update(_id: string, data: CreateAlbumDto) {
    let albumIdx: number;
    if ((albumIdx = this.albums.findIndex(({ id }) => id === _id)) !== -1) {
      this.albums[albumIdx] = { ...this.albums[albumIdx], ...data };
      return this.albums[albumIdx];
    }
    throw new Error(ErrMess.NOT_EXIST);
  }

  remove(_id: string) {
    if (this.albums.some(({ id }) => id === _id)) {
      this.albums = [...this.albums.filter(({ id }) => id !== _id)];
      return true;
    }
    return false;
  }
}
