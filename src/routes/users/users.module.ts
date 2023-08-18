import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggerModule } from 'src/services/logger/logger.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
