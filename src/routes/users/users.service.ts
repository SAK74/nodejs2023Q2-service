import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/services/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('Userssssssssssssssss');
  }

  // private logger = new Logger(UsersService.name);
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: { ...createUserDto, version: 1 } });
  }

  findAll() {
    this.logger.log('test massage from get method!');
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
