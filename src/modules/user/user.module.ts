import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { Role } from './roles/role.entity';
import { Permission } from './roles/permissions/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_PUBLIC_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  providers: [JwtStrategy, UserService],
  controllers: [UserController],
})
export class UserModule {}
