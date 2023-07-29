import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { notFound } from 'src/services/httpExceptions/not-found';
import { ErrMess } from 'src/services/errMessages';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    let _artist: Artist | undefined;
    if ((_artist = this.artistsService.findOne(id))) {
      return _artist;
    }
    throw notFound;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
  //   return this.artistsService.update(+id, updateArtistDto);
  // }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateArtistDto,
  ) {
    try {
      return this.artistsService.update(id, data);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw notFound;
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.artistsService.remove(id)) {
      throw notFound;
    }
  }
}
