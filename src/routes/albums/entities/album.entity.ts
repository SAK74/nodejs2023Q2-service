import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ format: 'uuid' }) id: string; // uuid v4
  @ApiProperty({ example: 'Imagine' }) name: string;
  @ApiProperty({ example: 1971 }) year: number;
  @ApiPropertyOptional({ format: 'uuid' }) artistId: string | null; // refers to Artist
}
