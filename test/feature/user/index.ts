import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { BaseTest } from '../../base';

import { UserRole } from '@modules/user/role/role.entity';
import { User } from '@modules/user/user.entity';
import { CreateUserRoleRequestDto, UpdateUserRoleRequestDto } from '@modules/user/role/dto';
import { CreateUserRequestDto, UpdateUserRequestDto } from '@modules/user/dto';
import { Example } from '@common';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const dataRole: CreateUserRoleRequestDto = {
    name: faker.name.jobType(),
    isSystemAdmin: true,
    permissions: ['Create'],
  };
  const dataUpdateRole: UpdateUserRoleRequestDto = {
    name: faker.name.jobType(),
    isSystemAdmin: false,
    permissions: ['Update'],
  };
  let resultRole: UserRole = {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    isSystemAdmin: false,
    permissions: [],
  };

  const data: CreateUserRequestDto = {
    avatar: faker.image.imageUrl(),
    name: faker.name.fullName(),
    password: Example.password,
    retypedPassword: Example.password,
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past(),
    roleId: resultRole.id,
  };

  const dataUpdate: UpdateUserRequestDto = {
    name: faker.name.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    startDate: faker.date.past(),
    description: faker.lorem.paragraph(),
    avatar: faker.image.imageUrl(),
    roleId: resultRole.id,
  };

  let result: User = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    startDate: faker.date.past(),
    positionCode: 'DEV',
    description: faker.lorem.paragraph(),
    avatar: faker.image.imageUrl(),
    dateLeave: faker.datatype.number({ min: 0.5, max: 12 }),
    dateOff: faker.datatype.number({ min: 0.5, max: 12 }),
  };
  it('Create [POST /user-role]', async () => {
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/user-role')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRole as CreateUserRoleRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
      resultRole = body.data;
    }
  });

  it('Get all [GET /user-role]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/user-role')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataRole));
    }
  });

  it('Get one [GET /user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
    }
  });

  it('Get one [GET /user-role/permission]', async () => {
    await request(BaseTest.server)
      .get('/user-role/permission')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  });

  it('Update one [PUT /user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateRole as UpdateUserRoleRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
    }
  });

  it('Create [POST /user]', async () => {
    data.roleId = resultRole.id;
    dataUpdate.roleId = resultRole.id;
    await new Promise((res) => setTimeout(res, 1));
    const { body } = await request(BaseTest.server)
      .post('/user/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreateUserRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      delete data.password;
      delete data.retypedPassword;
      delete data.description;
      delete data.roleId;
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /user]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/user/')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      delete data.dob;
      delete data.startDate;
      expect(body.data[0]).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/user/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Update one [PUT /user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/user/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate as UpdateUserRequestDto)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/user/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
    }
  });
};
