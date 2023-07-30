import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';
import { ErrMess } from 'src/services/errMessages';

@Injectable()
export class TracksService {
  tracks: Track[] = [];
  create(createTrackDto: CreateTrackDto) {
    const _track: Track = { ...createTrackDto, id: randomUUID() };
    this.tracks.push(_track);
    return _track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(_id: string) {
    return this.tracks.find(({ id }) => id === _id);
  }

  update(_id: string, data: CreateTrackDto) {
    let trackIdx: number;
    if ((trackIdx = this.tracks.findIndex(({ id }) => id === _id)) !== -1) {
      this.tracks[trackIdx] = { ...this.tracks[trackIdx], ...data };
      return this.tracks[trackIdx];
    }
    throw new Error(ErrMess.NOT_EXIST);
  }

  remove(_id: string) {
    if (this.tracks.some(({ id }) => id === _id)) {
      this.tracks = [...this.tracks.filter(({ id }) => id !== _id)];
      return true;
    }
    return false;
  }
}
