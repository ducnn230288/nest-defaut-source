import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { LoginUserRequestDto } from './dto/request/login.user.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserRequestDto } from './dto/request/register.user.request.dto';
import { TokenType } from '../../constants';
import { BaseService } from '../../base/base.service';
import { Role } from './roles/role.entity';
import { Permission } from './roles/permissions/permission.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) public repo: Repository<User>,
    @InjectRepository(Role) public repoRole: Repository<Role>,
    @InjectRepository(Permission) public repoPermission: Repository<Permission>,
    private readonly jwtService: JwtService,
  ) {
    super(repo);
  }

  getTokenForUser(user: User): string {
    return this.jwtService.sign({
      userId: user.id,
      type: TokenType.ACCESS_TOKEN,
      // role: user.role,
    });
  }

  async login(loginAuthDto: LoginUserRequestDto) {
    const user = await this.repo.findOne({
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

  async register(createUserDto: RegisterUserRequestDto) {
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.repo.findOne({
      where: [{ username: createUserDto.username }, { email: createUserDto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }
    // let adminRole = await this.repoRole.findOne({ where: { isSystemAdmin: true } });
    // if (!adminRole) {
    // const adminRole = this.repoRole.create({ name: 'User', isSystemAdmin: false });
    // await this.repoRole.save(adminRole);
    // const adminPermission = this.repoPermission.create({
    //   resourceName: 'User',
    //   creatorOnly: true,
    //   canRead: true,
    //   canCreate: true,
    //   canUpdate: true,
    //   canDelete: true,
    //   roleId: adminRole.id,
    // });
    // await this.repoPermission.save(adminPermission);
    // }
    // , roleId: adminRole.id
    const user = this.repo.create({ ...createUserDto });
    return await this.repo.save(user);
  }
}
