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
import { Public } from 'src/decorators/public.decorator';

export type Member = 'artist' | 'album' | 'track';

@Controller('favs')
@Public()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':member/:id')
  async addMemberToFavorite(
    @Param('member', new FavsTypeValidatePipe())
    member: Member,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    if (!(await this.favoritesService.addToFavs(member, id))) {
      // throw new HttpException(
      //   getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY),
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
      throw new UnprocessableEntityException();
    }
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

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
