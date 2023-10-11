import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ format: 'uuid' }) id: string; // uuid v4
  @ApiProperty({ example: 'Oh My Love' }) name: string;
  @ApiPropertyOptional({ format: 'uuid' }) artistId: string | null; // refers to Artist
  @ApiPropertyOptional({ format: 'uuid' }) albumId: string | null; // refers to Album
  @ApiProperty({ example: 229, description: 'duration in sec' })
  duration: number; // integer number
}
