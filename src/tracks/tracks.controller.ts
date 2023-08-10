import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Prisma } from '@prisma/client';

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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.tracksService.findOne(id);
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateTrackDto,
  ) {
    try {
      return await this.tracksService.update(id, data);
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.tracksService.remove(id);
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
