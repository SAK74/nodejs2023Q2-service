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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { notFound } from 'src/services/httpExceptions/not-found';
import { ErrMess } from 'src/services/errMessages';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    let _artist: Track | undefined;
    if ((_artist = this.tracksService.findOne(id))) {
      return _artist;
    }
    throw notFound;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
  //   return this.tracksService.update(+id, updateTrackDto);
  // }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: CreateTrackDto) {
    try {
      return this.tracksService.update(id, data);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw notFound;
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.tracksService.remove(id)) {
      throw notFound;
    }
  }
}
