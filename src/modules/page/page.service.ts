import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Not, IsNull } from 'typeorm';

import { BaseService } from '@common';
import { Page } from './page.entity';
import { PageTranslation } from '@modules/page/translation/translation.entity';
import { AllPageRequestDto, CreatePageRequestDto, ItemPageRequestDto, UpdatePageRequestDto } from '@modules/page/dto';

export const P_PAGE_LISTED = '6ac2a002-3f26-40d1-ac56-61c681af832f';
export const P_PAGE_CREATE = '5f877438-33b5-4145-baf9-9e9576c540f7';
export const P_PAGE_UPDATE = '0bd50247-a770-4d05-bc29-5b337fc268fa';
export const P_PAGE_DELETE = '1fd2b6de-3ccb-4119-8b26-877b81dd9836';

@Injectable()
export class PageService extends BaseService {
  constructor(
    @InjectRepository(Page)
    public readonly repo: Repository<Page>,
    private readonly dataSource: DataSource,
  ) {
    super(repo);
  }

  async findAllParent() {
    const data = await this.repo.findAndCount({
      where: { parentId: IsNull() },
      relations: ['children'],
      withDeleted: true,
      cache: 60000,
      order: {
        order: 'ASC',
        children: {
          order: 'ASC',
        },
      },
    });
    if (!data) {
      throw new NotFoundException(`data  Homepage not found`);
    }
    return data;
  }

  async findHome() {
    const data = await this.repo.findOne({
      relations: ['translations'],
      where: { isHomePage: true },
      withDeleted: true,
      cache: 60000,
    });
    if (!data) {
      throw new NotFoundException(`data  Homepage not found`);
    }
    return data;
  }

  async findOneBySlug(slug: string) {
    const data = await this.repo.findOne({
      where: { slug },
      withDeleted: true,
    });
    if (!data) {
      throw new NotFoundException(`data  #${slug} not found`);
    }
    return data;
  }

  async create(body: CreatePageRequestDto) {
    let result = null;
    await this.dataSource.transaction(async (entityManager) => {
      result = await entityManager.save(entityManager.create(Page, { ...body }));
      for (const item of body.translations) {
        const existingTitle = await entityManager.count(PageTranslation, {
          where: { title: item.title, language: item.language },
        });
        if (existingTitle) {
          throw new BadRequestException(`title is already taken`);
        }
        // const existingSlug = await entityManager.count(PageTranslation, {
        //   where: { slug: item.slug },
        // });
        // if (existingSlug) {
        //   throw new BadRequestException(`slug is already taken`);
        // }
        await entityManager.save(entityManager.create(PageTranslation, { pageId: result.id, ...item }));
      }
    });
    return result;
  }

  async update(id: string, body: UpdatePageRequestDto) {
    let result = null;
    await this.dataSource.transaction(async (entityManager) => {
      const data = await entityManager.preload(Page, {
        id,
        ...body,
      });
      if (!data) {
        throw new NotFoundException(`data  #${id} not found`);
      }
      result = await this.repo.save(data);
      for (const item of body.translations) {
        const existingTitle = await entityManager.count(PageTranslation, {
          where: { title: item.title, language: item.language, pageId: Not(id) },
        });
        if (existingTitle) {
          throw new BadRequestException(`title is already taken`);
        }
        // const existingSlug = await entityManager.count(PageTranslation, {
        //   where: { slug: item.slug, pageId: Not(id) },
        // });
        // if (existingSlug) {
        //   throw new BadRequestException(`slug is already taken`);
        // }
        await entityManager.save(await entityManager.preload(PageTranslation, { pageId: result.id, ...item }));
      }
    });
    return result;
  }

  async updateAll(body: AllPageRequestDto) {
    let result = null;
    await this.dataSource.transaction(async (entityManager) => {
      const loop = async (values: ItemPageRequestDto[]) => {
        for (const item of values) {
          const children = item.children;
          delete item.children;
          const data = await entityManager.preload(Page, item);
          if (!data) {
            throw new NotFoundException(`data  #${item.id} not found`);
          }
          data.children = [];
          if (item.parents) {
            for (const id of item.parents) {
              data.children.push(new Page({ id }));
            }
          }
          result = await this.repo.save(data);
          if (children) {
            await loop(children);
          }
        }
      };
      await loop(body.values);
    });
    return result;
  }
}
