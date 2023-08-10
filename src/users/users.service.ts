import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/services/errMessages';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: { ...createUserDto, version: 1 } });
  }

  findAll() {
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
    if (_oldPassword !== oldPassword) {
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
