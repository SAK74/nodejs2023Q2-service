import { User } from './users/entities/user.entity';
import { UserDto } from './users/dto/user.dto';

export function hidePassw(user: User): UserDto {
  const res = {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
  delete res.password;
  return res;
}
