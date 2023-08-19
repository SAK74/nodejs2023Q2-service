import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/types';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CustomLogger } from 'src/services/logger/logger.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) // private readonly logger: CustomLogger,
  {
    // this.logger.setContext('Userssssssssssssssss');
  }

  async create(_user: CreateUserDto) {
    const salt = await genSalt(Number(process.env.CRYPT_SALT));
    const hashedPassw = await hash(_user.password, salt);
    return this.prisma.user.create({
      data: { ..._user, version: 1, password: hashedPassw },
    });
  }

  findAll() {
    // this.logger.log('test massage from get method!');
    return this.prisma.user.findMany();
  }

  findOne(_id: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: _id,
      },
    });
  }

  async paswChange(
    _id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const _oldPassword = (await this.findOne(_id)).password;
    if (!(await compare(oldPassword, _oldPassword))) {
      throw new Error(ErrMess.WRONG_PASSW);
    }
    return this.prisma.user.update({
      where: { id: _id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });
  }

  remove(_id: string) {
    return this.prisma.user.delete({ where: { id: _id } });
  }
}
