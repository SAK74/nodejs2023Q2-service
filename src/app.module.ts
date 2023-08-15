import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestLogger } from './middleware/request-log.middleware';
import { LoggerModule } from './services/logger.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    PrismaModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('/');
  }
}
