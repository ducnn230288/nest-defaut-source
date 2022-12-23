import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { BaseTest } from '../../base';

import { CreateDataTypeRequestDto, UpdateDataTypeRequestDto } from '@modules/data/type/dto';
import { DataType } from '@modules/data/type/type.entity';
import { CreateDataRequestDto, UpdateDataRequestDto } from '@modules/data/dto';
import { Data } from '@modules/data/data.entity';
import { DataTypeService } from '@modules/data/type/type.service';
import { DataService } from '@modules/data/data.service';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const dataType: CreateDataTypeRequestDto = {
    name: faker.name.jobType(),
    code: faker.finance.bic(),
  };
  const dataUpdateType: UpdateDataTypeRequestDto = {
    name: faker.name.jobType(),
  };
  let resultType: DataType = {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    code: faker.finance.bic(),
    isPrimary: false,
  };

  const data: CreateDataRequestDto = {
    type: dataType.code,
    image: faker.image.imageUrl(),
    translations: [
      {
        language: 'vn',
        name: faker.name.jobType(),
        description: faker.lorem.paragraph(),
      },
      {
        language: 'en',
        name: faker.name.jobType(),
        description: faker.lorem.paragraph(),
      },
    ],
    order: 1,
  };

  const dataUpdate: UpdateDataRequestDto = {
    type: dataType.code,
    image: faker.image.imageUrl(),
    translations: [
      {
        language: 'vn',
        name: faker.name.jobType(),
        description: faker.lorem.paragraph(),
      },
      {
        language: 'en',
        name: faker.name.jobType(),
        description: faker.lorem.paragraph(),
      },
    ],
    order: 2,
  };

  let result: Data = {
    id: faker.datatype.uuid(),
    type: resultType.code,
    image: faker.image.imageUrl(),
  };
  it('Create [POST /data-type]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/data-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType as CreateDataTypeRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /data-type]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/data-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get one [GET /data-type/:id]', async () => {
    if (!type) {
      resultType = await BaseTest.moduleFixture.get(DataTypeService).create(dataType);
    }
    const { body } = await request(BaseTest.server)
      .get('/data-type/' + resultType.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Update one [PUT /data-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/data-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType as UpdateDataTypeRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });

  it('Create [POST /data]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/data/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreateDataRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /data]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/data/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

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

  it('Get one [GET /data/:id]', async () => {
    if (!type) {
      result = await BaseTest.moduleFixture.get(DataService).create(data);
    }
    const { body } = await request(BaseTest.server)
      .get('/data/' + result.id)
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

  it('Update one [PUT /data/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/data/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate as UpdateDataRequestDto)
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

  it('Delete one [DELETE /data/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/data/' + result.id)
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

  it('Delete one [DELETE /data-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/data-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });
};
