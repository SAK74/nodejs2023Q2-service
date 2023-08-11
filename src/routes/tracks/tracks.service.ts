import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
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
    return this.prisma.track.delete({ where: { id: _id } });
  }
}
