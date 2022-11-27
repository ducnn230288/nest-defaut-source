import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../common';
import { CreateUserRequestDto } from './dto';
import { User } from './user.entity';

export const P_USER_LISTED = 'ac0c4f13-776d-4b71-be4d-f9952734a319';
export const P_USER_DETAIL = 'a9de3f3d-4c04-4f50-9d1b-c3c2e2eca6dc';
export const P_USER_CREATE = '41c9d4e1-ba5a-4850-ad52-35ac928a61d9';
export const P_USER_UPDATE = 'bc0b5f32-ddf7-4c61-b435-384fc5ac7574';
export const P_USER_DELETE = 'b82e6224-12c3-4e6c-b4e0-62495fb799bf';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    public repo: Repository<User>,
  ) {
    super(repo);
  }

  async create(createUserDto: CreateUserRequestDto) {
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.repo.findOne({
      where: [{ email: createUserDto.email }],
    });

    if (existingUser) {
      throw new BadRequestException(['email is already taken']);
    }
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  async update(id: string, body: any) {
    const data = await this.repo.preload({
      id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`data  #${id} not found`);
    }
    delete data.password;
    return this.repo.save(data);
  }
}
