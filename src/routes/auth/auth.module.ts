import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    // {
    //   ...JwtModule.register({
    //     secret: process.env.JWT_SECRET_KEY,
    //   }),
    //   global: true,
    // },
    {
      global: true,
      module: JwtModule,
    }.module.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
})
export class AuthModule {}
