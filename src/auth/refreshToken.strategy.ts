import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../modules/user/user.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userRepository.findOne({ where: { id: payload.userId, email: payload.email } });
    if (!user || !user.refreshToken) throw new UnauthorizedException();

    const refreshTokenMatches = await bcrypt.compare(
      req.get('Authorization').replace('Bearer', '').trim(),
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new UnauthorizedException();

    return user;
  }
}
