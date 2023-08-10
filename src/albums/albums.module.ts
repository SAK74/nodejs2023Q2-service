import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), TracksModule, PrismaModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
