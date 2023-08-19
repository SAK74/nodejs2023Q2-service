import { User } from './users/entities/user.entity';

export function hidePassw(user: User) {
  const res = {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
  delete res.password;
  return res;
}
