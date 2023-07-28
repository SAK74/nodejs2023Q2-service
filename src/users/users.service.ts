import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrMess } from 'src/services/errMessages';

@Injectable()
export class UsersService {
  users: User[];
  constructor() {
    this.users = [];
  }
  create(createUserDto: CreateUserDto) {
    const _user: User = {
      ...createUserDto,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(_user);
    const res = { ..._user };
    delete res.password;
    return res;
  }

  findAll() {
    return [
      ...this.users.map((user) => {
        delete user.password;
        return user;
      }),
    ];
  }

  findOne(_id: string) {
    return this.users.find(({ id }) => id === _id);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  paswChange(_id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    let _user: User | undefined;
    if ((_user = this.users.find(({ id }) => id === _id))) {
      if (oldPassword === _user.password) {
        const userIdx = this.users.findIndex(({ id }) => id === _id);
        this.users[userIdx] = {
          ...this.users[userIdx],
          password: newPassword,
          version: _user.version + 1,
          updatedAt: Date.now(),
        };
        const res = { ...this.users[userIdx] };
        delete res.password;
        return res;
      }
      throw new Error(ErrMess.WRONG_PASSW);
    }
    throw new Error(ErrMess.NOT_EXIST);
  }

  remove(_id: string) {
    if (this.users.some(({ id }) => id === _id)) {
      this.users = [...this.users.filter(({ id }) => id !== _id)];
      return true;
    }
    return false;
  }
}
