import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { notFound } from 'src/services/httpExceptions/not-found';
import { ErrMess } from 'src/services/errMessages';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    let _artist: Album | undefined;
    if ((_artist = this.albumsService.findOne(id))) {
      return _artist;
    }
    throw notFound;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
  //   return this.albumsService.update(+id, updateAlbumDto);
  // }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: CreateAlbumDto) {
    try {
      return this.albumsService.update(id, data);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw notFound;
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.albumsService.remove(id)) {
      throw notFound;
    }
  }
}
