import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RoleType, TokenType } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PUBLIC_KEY,
    });
  }

  async validate(payload: { userId: string; role: RoleType; type: TokenType }) {
    if (payload.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.userId, role: payload.role },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
