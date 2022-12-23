import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';

import { AppModule } from '@src/app.module';
import { AppDataSource } from '@src/data-source';
import { Example } from '@common';
import { UserRoleService } from '@modules/user/role/role.service';
import { AuthService } from '@auth/auth.service';

export const BaseTest = {
  userAdmin: {
    name: faker.name.fullName(),
    password: Example.password,
    retypedPassword: Example.password,
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past(),
    roleId: undefined,
  },
  userRole: {
    name: faker.name.fullName(),
    password: Example.password,
    retypedPassword: Example.password,
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past(),
    roleId: undefined,
  },
  user: {
    name: faker.name.fullName(),
    password: Example.password,
    retypedPassword: Example.password,
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past(),
  },
  app: undefined,
  server: undefined,
  token: undefined,
  serviceRole: undefined,
  serviceAuth: undefined,
  moduleFixture: undefined,

  initBeforeAll: async (type?: string, permissions: string[] = []) => {
    await new Promise((res) => setTimeout(res, 1));
    await AppDataSource.initialize();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    BaseTest.serviceRole = moduleFixture.get<UserRoleService>(UserRoleService);
    BaseTest.serviceAuth = moduleFixture.get<AuthService>(AuthService);
    BaseTest.moduleFixture = moduleFixture;
    BaseTest.app = moduleFixture.createNestApplication();
    await BaseTest.app.init();
    BaseTest.server = BaseTest.app.getHttpServer();
    switch (type) {
      case 'Admin':
        await BaseTest.loginAdmin();
        break;
      case 'Role':
        await BaseTest.loginRole(permissions);
        break;
      default:
        await BaseTest.loginUser();
    }
  },
  login: async (user) => {
    await BaseTest.serviceAuth.register(user);
    const { body } = await request(BaseTest.server)
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(HttpStatus.CREATED);
    BaseTest.token = body.data.accessToken;
  },
  loginAdmin: async () => {
    const role = await BaseTest.serviceRole.create({ name: 'Administrator', isSystemAdmin: true, permissions: [] });
    BaseTest.userAdmin.roleId = role.id;
    await BaseTest.login(BaseTest.userAdmin);
  },
  loginUser: async () => await BaseTest.login(BaseTest.user),
  loginRole: async (permissions: string[] = []) => {
    const role = await BaseTest.serviceRole.create({ name: 'Administrator', isSystemAdmin: false, permissions });
    BaseTest.userRole.roleId = role.id;
    await BaseTest.login(BaseTest.userRole);
  },

  initAfterAll: async () => {
    await BaseTest.app.close();
    await BaseTest.server.close();
    await AppDataSource.dropDatabase();
  },
};
