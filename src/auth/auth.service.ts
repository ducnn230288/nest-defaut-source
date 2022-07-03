import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginAuthRequestDto } from './dto/login.auth.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async login(loginAuthDto: LoginAuthRequestDto) {
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

  async register(createUserDto: RegisterUserDto) {
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username: createUserDto.username }, { email: createUserDto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    const password = await this.hashPassword(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, password });
    return await this.userRepository.save(user);
  }
}
