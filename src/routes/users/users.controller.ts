import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  // ParseUUIDPipe,
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
import {
  ApiTags,
  ApiForbiddenResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@ApiUnauthorizedResponse({ description: 'Unauthorized.' })
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map((user) => hidePassw(user));
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiOperation({
    summary: 'Get certain user',
    description: 'Get user with id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return hidePassw(await this.usersService.findOne(id));
    } catch (err) {
      // console.log(err.message);
      if (err instanceof Prisma.NotFoundError) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOperation({ summary: 'Add user', description: 'Add simple user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return hidePassw(await this.usersService.create(createUserDto));
  }

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiForbiddenResponse({ description: 'Wrong password.' })
  @ApiOperation({
    summary: 'Change password',
    description: 'Change user password',
  })
  @Put(':id')
  async passwChange(
    @Param('id') id: string,
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

  @ApiNoContentResponse({ description: 'User has been deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Entity not exist' })
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.meta?.cause);
    }
  }
}
