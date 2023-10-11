import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavsTypeValidatePipe } from './pipes/favs-type-validate.pipe';
import { StatusCodes } from 'http-status-codes';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export type Member = 'artist' | 'album' | 'track';

@ApiBearerAuth()
@ApiTags('Favorites')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @ApiOperation({
    summary: 'Add to favorites',
    description: 'Add artist/album/track to favs',
  })
  @ApiParam({
    name: 'member',
    enum: ['artist', 'album', 'track'],
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({ description: 'Member has been added to favorites' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnprocessableEntityResponse({ description: "Entity does't exist" })
  @Post(':member/:id')
  async addMemberToFavorite(
    @Param('member', new FavsTypeValidatePipe())
    member: Member,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (!(await this.favoritesService.addToFavs(member, id))) {
      throw new UnprocessableEntityException();
    }
  }

  @ApiOperation({
    summary: 'Remove from favorites',
    description: 'Remove artist/ album / track from favorites',
  })
  @ApiParam({
    name: 'member',
    enum: ['artist', 'album', 'track'],
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({
    description: 'Member has been removed from favorites',
  })
  @ApiNotFoundResponse({ description: "Member does't exist" })
  @Delete(':member/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeFromFavs(
    @Param('member', new FavsTypeValidatePipe())
    member: Member,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      await this.favoritesService.removeFromFavs(member, id);
    } catch (err) {
      // console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
