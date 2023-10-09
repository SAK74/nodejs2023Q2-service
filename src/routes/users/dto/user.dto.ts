import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto extends OmitType(User, [
  'createdAt',
  'updatedAt',
  'password',
]) {
  @ApiProperty({ example: Date.now() }) createdAt: number;
  @ApiProperty({ example: Date.now() }) updatedAt: number;
  @ApiProperty({ example: 1 }) version: number;
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty({ example: 'Mike12' }) login: string;
}
