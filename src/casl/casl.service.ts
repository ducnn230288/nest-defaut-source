import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
@Injectable()
export class CaslService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async findAllPermissionsOfUser(role: any) {
    return await this.roleRepository.findOne(role);
  }
}