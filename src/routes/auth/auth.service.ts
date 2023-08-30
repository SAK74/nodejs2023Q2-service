import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}
  async login({ login, password }: CreateUserDto) {
    const user = (await this.usersService.findAll()).find(
      (user) => user.login === login,
    );
    if (!user || !compare(password, user.password)) {
      throw new UnauthorizedException("User don't exist");
    }
    return {
      accessToken: await this.getAccessToken(user.id, user.login),
      refreshToken: await this.getRefreshToken(user.id, user.login),
    };
  }

  private async getAccessToken(userId: string, userLogin: string) {
    return await this.jwt.signAsync(
      { userId, userLogin },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  private async getRefreshToken(userId: string, userLogin: string) {
    return await this.jwt.signAsync(
      { userId, userLogin },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }

  async refresh(login?: string) {
    const user = (await this.usersService.findAll()).find(
      (user) => user.login === login,
    );
    if (!user) {
      throw new UnauthorizedException("User don't exist");
    }
    return {
      accessToken: await this.getAccessToken(user.id, user.login),
      refreshToken: await this.getRefreshToken(user.id, user.login),
    };
  }
}
