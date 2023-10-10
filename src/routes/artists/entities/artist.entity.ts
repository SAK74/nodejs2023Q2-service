import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ format: 'uuid' }) id: string; // uuid v4
  @ApiProperty({ example: 'John Lenon' }) name: string;
  grammy: boolean;
}
