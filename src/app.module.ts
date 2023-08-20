import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { ArtistsModule } from './routes/artists/artists.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { AlbumsModule } from './routes/albums/albums.module';
import { FavoritesModule } from './routes/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestLogger } from './middleware/request-log.middleware';
import { LoggerModule } from './services/logger/logger.module';
import { CustomLogger } from './services/logger/logger.service';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './services/exceptions/exception.filter';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    PrismaModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('/');
  }
  constructor(private logger: CustomLogger) {
    process.on('uncaughtException', (err, origin) => {
      logger.setContext('Custom' + origin);
      logger.error(err.message);
    });
    process.on('unhandledRejection', (reason) => {
      logger.setContext('Custom unhandledRejection');
      logger.error(reason as string);
    });
  }
}
