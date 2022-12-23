import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@common';
import { PageTranslation } from './translation.entity';

@Injectable()
export class PageTranslationService extends BaseService {
  constructor(
    @InjectRepository(PageTranslation)
    public repo: Repository<PageTranslation>,
  ) {
    super(repo);
  }
}
