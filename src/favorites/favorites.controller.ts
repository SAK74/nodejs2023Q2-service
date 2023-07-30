import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavsTypeValidatePipe } from './pipes/favs-type-validate.pipe';
import { Favorites } from './entities/favorite.entity';
import { ErrMess } from 'src/services/errMessages';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

type Member = 'artist' | 'album' | 'track';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':member/:id')
  addMemberToFavorite(
    @Param('member', new FavsTypeValidatePipe())
    member: Member,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      this.favoritesService.addToFavs(this.setMember(member), id);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw new HttpException(
          getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  private setMember(member: Member): keyof Favorites {
    return member === 'album'
      ? 'albums'
      : member === 'artist'
      ? 'artists'
      : 'tracks';
  }

  // @Post('artist/:id')
  // addArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   this.favoritesService.addToFavs('artists', id);
  // }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':member/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFromFavs(
    @Param('member', new FavsTypeValidatePipe())
    member: 'artist' | 'album' | 'track',
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      this.favoritesService.removeFromFavs(this.setMember(member), id);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw new HttpException(
          getReasonPhrase(HttpStatus.UNPROCESSABLE_ENTITY),
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }
}
