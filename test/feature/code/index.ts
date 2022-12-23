import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { BaseTest } from '../../base';

import { CodeType } from '@modules/code/type/type.entity';
import { Code } from '@modules/code/code.entity';
import { CreateCodeTypeRequestDto, UpdateCodeTypeRequestDto } from '@modules/code/type/dto';
import { CreateCodeRequestDto, UpdateCodeRequestDto } from '@modules/code/dto';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const dataType: CreateCodeTypeRequestDto = {
    name: faker.name.jobType(),
    code: faker.finance.bic(),
  };
  const dataUpdateType: UpdateCodeTypeRequestDto = {
    name: faker.name.jobType(),
  };
  let resultType: CodeType = {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    code: faker.finance.bic(),
  };

  const data: CreateCodeRequestDto = {
    name: faker.name.jobType(),
    code: faker.finance.bic(),
    type: dataType.code,
    description: faker.lorem.paragraph(),
  };

  const dataUpdate: UpdateCodeRequestDto = {
    name: faker.name.jobType(),
  };

  let result: Code = {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    type: resultType.code,
    code: faker.finance.bic(),
  };
  it('Create [POST /code-type]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/code-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType as CreateCodeTypeRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /code-type]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/code-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get one [GET /code-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/code-type/' + resultType.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Update one [PUT /code-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/code-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType as UpdateCodeTypeRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });

  it('Create [POST /code]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/code/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreateCodeRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /code]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/code/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Update one [PUT /code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate as UpdateCodeRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /code-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/code-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });
};
