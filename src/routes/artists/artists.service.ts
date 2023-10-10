import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  // artists: Artist[] = [];
  constructor(private prisma: PrismaService) {}
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
    return this.prisma.artist.delete({ where: { id: _id } });
  }
}
