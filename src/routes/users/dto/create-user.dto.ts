import { IsDefined, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends PartialType(User) {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: 'User login' })
  login: string;
  @IsDefined()
  @IsString()
  @ApiProperty({ description: 'User password' })
  password: string;
}
