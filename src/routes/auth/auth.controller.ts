import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Public } from './decorators/public.decorator';
import { RefreshGuard } from './refresh.guard';
import { RequestWithLogin } from './types';
import { hidePassw } from '../helpers';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const _token: SchemaObject = {
  type: 'string',
  description: 'JWT token',
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Signup', description: 'User signup' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('signup')
  @Public()
  async signup(@Body() signDto: CreateUserDto) {
    // throw Error('Oppps...');
    return hidePassw(await this.usersService.create(signDto));
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-token',
  })
  @ApiOkResponse({
    description: 'Successfull login',
    schema: {
      type: 'object',
      properties: { accesToken: _token, refreshToken: _token },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Incorrect login or password' })
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() signDto: CreateUserDto) {
    return await this.authService.login(signDto);
  }

  @ApiOperation({ summary: 'Refresh token', description: 'Get refresh token' })
  @ApiBody({
    description: 'Refresh token',
    schema: { type: 'object', properties: { refreshToken: _token } },
  })
  @ApiOkResponse({
    description: 'New tokens pair',
    schema: {
      type: 'object',
      properties: { accesToken: _token, refreshToken: _token },
    },
  })
  @ApiForbiddenResponse({ description: 'Refresh token is invalid or expired' })
  @ApiUnauthorizedResponse({ description: 'No jwt provided!' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  async refresh(@Request() req: RequestWithLogin) {
    // console.log(req?.userLogin);
    return await this.authService.refresh(req?.userLogin);
  }
}
