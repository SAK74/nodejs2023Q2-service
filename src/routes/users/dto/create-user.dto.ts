import { IsDefined, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  @IsDefined() @IsString() login: string;
  @IsDefined() @IsString() password: string;
}
