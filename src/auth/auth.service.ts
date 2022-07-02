import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginAuthDto } from './dto/login.auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginAuthDto.username },
    });

    if (!user) {
      throw new UnauthorizedException(`User ${loginAuthDto.username} not found!`);
    }

    if (!(await bcrypt.compare(loginAuthDto.password, user.password))) {
      throw new UnauthorizedException(`Invalid credentials for user ${loginAuthDto.username}`);
    }
    return user;
  }
}
