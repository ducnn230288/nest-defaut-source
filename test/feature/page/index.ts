import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { BaseTest } from '../../base';

import { CreatePageRequestDto, UpdatePageRequestDto, AllPageRequestDto } from '@modules/page/dto';
import { Page } from '@modules/page/page.entity';
import { PageService } from '@modules/page/page.service';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const data: CreatePageRequestDto = {
    name: faker.name.jobType(),
    style: 'style1',
    translations: [
      {
        language: 'vn',
        title: faker.name.jobType(),
        slug: faker.lorem.slug(),
        seoDescription: faker.lorem.paragraph(),
      },
      {
        language: 'en',
        slug: faker.lorem.slug(),
        title: faker.name.jobType(),
        seoDescription: faker.lorem.paragraph(),
      },
    ],
  };

  const dataUpdate: UpdatePageRequestDto = {
    name: faker.name.jobType(),
    style: 'style1',
    translations: [
      {
        language: 'vn',
        slug: faker.lorem.slug(),
        title: faker.name.jobType(),
        seoDescription: faker.lorem.paragraph(),
      },
      {
        language: 'en',
        slug: faker.lorem.slug(),
        title: faker.name.jobType(),
        seoDescription: faker.lorem.paragraph(),
      },
    ],
  };

  let result: Page = {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    style: 'style1',
  };

  const dataUpdateAll: AllPageRequestDto = {
    values: [
      {
        id: result.id,
        parentId: result.parentId,
        order: 2,
        parents: [],
        children: [],
      },
    ],
  };

  it('Create [POST /page]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/page/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreatePageRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
      dataUpdateAll.values[0].id = result.id;
      dataUpdateAll.values[0].parentId = result.parentId;
    }
  });

  it('Get all [GET /page]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/page/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);

    if (type) {
      body.data[0].translations.forEach((item: any) => {
        let index;
        data.translations.forEach((subItem: any, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(data.translations[index]));
      });
      body.data[0].translations = data.translations;
      expect(body.data[0]).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /page/slug]', async () => {
    if (!type) {
      result = await BaseTest.moduleFixture.get(PageService).create(data);
    }
    const { body } = await request(BaseTest.server)
      .get('/page/slug?slug=' + result.translations[0].slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .set('Accept-Language', result.translations[0].language)
      .expect(HttpStatus.OK);
    if (type) {
      body.data.translations.forEach((item: any) => {
        let index;
        data.translations.forEach((subItem: any, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(data.translations[index]));
        dataUpdate.translations[index].id = item.id;
      });
      body.data.translations = data.translations;
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /page/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/page/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) {
      body.data.translations.forEach((item: any) => {
        let index;
        data.translations.forEach((subItem: any, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(data.translations[index]));
        dataUpdate.translations[index].id = item.id;
      });
      body.data.translations = data.translations;
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Update all [PUT /page/all]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/page/all')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateAll as AllPageRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      delete dataUpdateAll.values[0].parents;
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateAll.values[0]));
    }
  });

  it('Update one [PUT /page/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/page/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate as UpdatePageRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.translations.forEach((item: any) => {
        let index;
        data.translations.forEach((subItem: any, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(dataUpdate.translations[index]));
        dataUpdate.translations[index].id = item.id;
      });
      body.data.translations = dataUpdate.translations;
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /page/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/page/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.translations.forEach((item: any) => {
        let index;
        data.translations.forEach((subItem: any, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(dataUpdate.translations[index]));
      });
      body.data.translations = dataUpdate.translations;
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });
};
