import { Module, forwardRef } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    AlbumsModule,
    TracksModule,
    PrismaModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
