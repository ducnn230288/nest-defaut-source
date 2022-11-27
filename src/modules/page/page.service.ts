import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../common';
import { Page } from './page.entity';

export const P_PAGE_LISTED = '6ac2a002-3f26-40d1-ac56-61c681af832f';
export const P_PAGE_DETAIL = '63bb0920-8757-4b0b-88ea-91bc9a11533d';
export const P_PAGE_CREATE = '5f877438-33b5-4145-baf9-9e9576c540f7';
export const P_PAGE_UPDATE = '0bd50247-a770-4d05-bc29-5b337fc268fa';
export const P_PAGE_DELETE = '1fd2b6de-3ccb-4119-8b26-877b81dd9836';

@Injectable()
export class PageService extends BaseService {
  constructor(
    @InjectRepository(Page)
    public repo: Repository<Page>,
  ) {
    super(repo);
  }
}
