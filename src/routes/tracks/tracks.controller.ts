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
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @Get()
  findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOperation({ summary: 'Add single track' })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(createTrackDto);
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiOperation({ summary: 'Get single track', description: 'Get track by ID' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    try {
      return await this.tracksService.findOne(id);
    } catch (err) {
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiOperation({ summary: 'Edit single track' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateTrackDto,
  ): Promise<Track> {
    try {
      return await this.tracksService.update(id, data);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }

  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiOperation({ summary: 'Delete single track' })
  @ApiNoContentResponse({ description: 'Entity has been deleted successfully' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.tracksService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
