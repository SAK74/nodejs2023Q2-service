import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/types';
import { Prisma } from '@prisma/client';
import { hidePassw } from '../helpers';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return hidePassw(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map((user) => hidePassw(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return hidePassw(await this.usersService.findOne(id));
    } catch (err) {
      // console.log(err.message);
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Put(':id')
  async passwChange(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwUpdate: UpdatePasswordDto,
  ) {
    try {
      return hidePassw(await this.usersService.paswChange(id, passwUpdate));
    } catch (err) {
      if ((err as Error).message === ErrMess.WRONG_PASSW) {
        throw new HttpException('Wrong password!', HttpStatus.FORBIDDEN);
      }
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.usersService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
