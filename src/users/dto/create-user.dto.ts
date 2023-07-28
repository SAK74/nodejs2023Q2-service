import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined() @IsString() login: string;
  @IsDefined() @IsString() password: string;
}
