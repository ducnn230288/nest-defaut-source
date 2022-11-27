import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';
import { User } from '../modules/user/user.entity';
import { UserRole } from '../modules/user/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_PUBLIC_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
