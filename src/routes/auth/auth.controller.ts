import {
  Body,
  Controller,
  Post,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() signDto: CreateUserDto) {
    await this.usersService.create(signDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signDto: CreateUserDto) {
    try {
      return await this.authService.login(signDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
