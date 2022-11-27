import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../../common';
import { CategoryType } from './type.entity';

export const P_CATEGORY_TYPE_LISTED = '2a71d57d-7c2d-49ad-a7e9-3cd4aace132f';
export const P_CATEGORY_TYPE_DETAIL = '7af26c77-e81f-4875-89df-9d4c2fa3ce52';
export const P_CATEGORY_TYPE_CREATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d5';
export const P_CATEGORY_TYPE_UPDATE = 'fdb47b79-1a6e-49be-8f5b-8525a547534a';
export const P_CATEGORY_TYPE_DELETE = 'f16e2bc7-12b9-446e-b53b-a2597ca0ad3a';

@Injectable()
export class CategoryTypeService extends BaseService {
  constructor(
    @InjectRepository(CategoryType)
    public repo: Repository<CategoryType>,
  ) {
    super(repo);
  }

  async findOneCode(code: string) {
    const data = await this.repo.findOne({
      where: { code },
      withDeleted: true,
    });
    if (!data) {
      throw new NotFoundException(`data  ${code} not found`);
    }
    return data;
  }
}
