import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestLogger } from './middleware/request-log.middleware';
import { LoggerModule } from './services/logger.module';
import { CustomLogger } from './services/logger.service';

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
  constructor(private logger: CustomLogger) {
    logger.setContext('NODE');
    process.on('uncaughtException', (err, origin) => {
      logger.setContext(origin);
      logger.error(err.message);
    });
    process.on('unhandledRejection', (reason) => {
      logger.setContext('unhandledRejection');
      logger.error(reason as string);
    });
  }
}
