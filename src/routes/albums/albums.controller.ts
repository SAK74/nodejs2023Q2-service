import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  // ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Prisma } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiBearerAuth()
@ApiTags('Albums')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @ApiOperation({ summary: 'Add single album' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiOperation({
    summary: 'Get single album',
    description: 'Get single album by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    try {
      return await this.albumsService.findOne(id);
    } catch (err) {
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @ApiOperation({ summary: 'Edit single album' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiParam({ format: 'uuid', name: 'id' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateAlbumDto,
  ): Promise<Album> {
    try {
      return await this.albumsService.update(id, data);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }

  @ApiOperation({
    summary: 'Delete single album',
    description: 'Delete album by id',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiNoContentResponse({ description: 'Entity has been deleted successfully' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.albumsService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
