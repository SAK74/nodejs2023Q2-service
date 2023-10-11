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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiBearerAuth()
@ApiTags('Artists')
@ApiUnauthorizedResponse({ description: 'Unauthorized.' })
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artists', description: 'Get all artists' })
  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single artists',
    description: 'Get single artists',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    try {
      return await this.artistsService.findOne(id);
    } catch (err) {
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOperation({ summary: 'Add single artist' })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Edit single artist' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateArtistDto,
  ): Promise<Artist> {
    try {
      return await this.artistsService.update(id, data);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }

  @ApiOperation({ summary: 'Delete artist entity' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'Entity has been deleted successfully' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.artistsService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
