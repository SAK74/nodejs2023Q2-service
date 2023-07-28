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
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/services/errMessages';
import { notFound } from 'src/services/httpExceptions/not-found';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    let _user: User | undefined;
    if ((_user = this.usersService.findOne(id))) {
      return _user;
    }
    throw notFound;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Put(':id')
  passwChange(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwUpdate: UpdatePasswordDto,
  ) {
    try {
      return this.usersService.paswChange(id, passwUpdate);
    } catch (err) {
      if ((err as Error).message === ErrMess.NOT_EXIST) {
        throw notFound;
      }
      if ((err as Error).message === ErrMess.WRONG_PASSW) {
        throw new HttpException('Wrong password!', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      if (!this.usersService.remove(id)) {
        throw notFound;
      }
    } catch (err) {
      throw new HttpException(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
