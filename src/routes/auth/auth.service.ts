import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}
  async login({ login, password }: CreateUserDto) {
    const user = (await this.usersService.findAll()).find(
      (user) => user.login === login,
    );
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    return {
      jwt: await this.jwt.signAsync({ userId: user.id, userLogin: user.login }),
    };
  }
}
