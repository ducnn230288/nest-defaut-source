import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { BaseTest } from '../../base';

import { CreateCategoryTypeRequestDto } from '../../../src/modules/category/type/dto/request/create.type.request.dto';
import { UpdateCategoryTypeRequestDto } from '../../../src/modules/category/type/dto/request/update.type.request.dto';
import { CategoryType } from '../../../src/modules/category/type/type.entity';
import { CreateCategoryRequestDto } from 'src/modules/category/dto/request/create.category.request.dto';
import { UpdateCategoryRequestDto } from 'src/modules/category/dto/request/update.category.request.dto';
import { Category } from 'src/modules/category/category.entity';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const dataType: CreateCategoryTypeRequestDto = {
    name: faker.name.jobType(),
    code: faker.finance.bic(),
  };
  const dataUpdateType: UpdateCategoryTypeRequestDto = {
    name: faker.name.jobType(),
  };
  let resultType: CategoryType = {
    id: faker.database.mongodbObjectId(),
    name: faker.name.jobType(),
    code: faker.finance.bic(),
  };

  const data: CreateCategoryRequestDto = {
    name: faker.name.jobType(),
    code: faker.finance.bic(),
    type: dataType.code,
    description: faker.lorem.paragraph(),
  };

  const dataUpdate: UpdateCategoryRequestDto = {
    name: faker.name.jobType(),
  };

  let result: Category = {
    id: faker.database.mongodbObjectId(),
    name: faker.name.jobType(),
    type: resultType.code,
    code: faker.finance.bic(),
  };
  it('Create category-type [POST /]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/category-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType as CreateCategoryTypeRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataType,
        }),
      );
      resultType = body.data;
    }
  });

  it('Get all [GET /]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/category-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(
        jasmine.objectContaining({
          ...dataType,
        }),
      );
    }
  });

  it('Get one [GET /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/category-type/' + resultType.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataType,
        }),
      );
    }
  });

  it('Update one [PUT /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/category-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType as UpdateCategoryTypeRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataUpdateType,
        }),
      );
    }
  });

  it('Delete one [DELETE /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/category-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataUpdateType,
        }),
      );
    }
  });

  it('Create category [POST /]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/category/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreateCategoryRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...data,
        }),
      );
      result = body.data;
    }
  });

  it('Get all [GET /]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/category/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data[0]).toEqual(
        jasmine.objectContaining({
          ...data,
        }),
      );
    }
  });

  it('Get one [GET /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/category/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...data,
        }),
      );
    }
  });

  it('Update one [PUT /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/category/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate as UpdateCategoryRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataUpdate,
        }),
      );
    }
  });

  it('Delete one [DELETE /:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/category/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(
        jasmine.objectContaining({
          ...dataUpdate,
        }),
      );
    }
  });
};
