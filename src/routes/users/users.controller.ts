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
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/types';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) // private readonly logger = new Logger(UsersController.name),
  {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.hidePassw(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    // this.logger.log('some message from "get"');
    return (await this.usersService.findAll()).map((user) =>
      this.hidePassw(user),
    );
  }

  private hidePassw(user: User) {
    const res = {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
    delete res.password;
    return res;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.hidePassw(await this.usersService.findOne(id));
    } catch (err) {
      console.log(err.message);
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
      return this.hidePassw(
        await this.usersService.paswChange(id, passwUpdate),
      );
    } catch (err) {
      console.log(err);
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
      console.log(err);
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
