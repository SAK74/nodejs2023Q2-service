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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @Public()
  async signup(@Body() signDto: CreateUserDto) {
    // throw Error('Oppps...');
    return hidePassw(await this.usersService.create(signDto));
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() signDto: CreateUserDto) {
    return await this.authService.login(signDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  async refresh(@Request() req: RequestWithLogin) {
    // console.log(req?.userLogin);
    return await this.authService.refresh(req?.userLogin);
  }
}
