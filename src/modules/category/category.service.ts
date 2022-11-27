import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../common';
import { Category } from './category.entity';

export const P_CATEGORY_LISTED = '5d808d76-bf99-4a51-b4b6-d5aa37bdb398';
export const P_CATEGORY_DETAIL = 'eb510a79-4f75-4b14-a118-f036c1daa430';
export const P_CATEGORY_CREATE = 'a9574d5e-269d-44f9-a5bb-41cf06d7bdda';
export const P_CATEGORY_UPDATE = '6d34b679-9c0e-489a-a2de-a17e37fadf72';
export const P_CATEGORY_DELETE = 'e21ac25b-1651-443e-9834-e593789807c9';

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(Category)
    public repo: Repository<Category>,
  ) {
    super(repo);
  }
}
