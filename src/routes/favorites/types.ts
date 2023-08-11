import { Artist } from 'src/routes/artists/entities/artist.entity';
import { Album } from 'src/routes/albums/entities/album.entity';
import { Track } from 'src/routes/tracks/entities/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
