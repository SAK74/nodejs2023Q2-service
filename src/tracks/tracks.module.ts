import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => FavoritesModule), PrismaModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
