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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Prisma } from '@prisma/client';

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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistsService.findOne(id);
    } catch (err) {
      // console.log(err);
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateArtistDto,
  ) {
    try {
      return await this.artistsService.update(id, data);
    } catch (err) {
      // console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.artistsService.remove(id);
    } catch (err) {
      // console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
