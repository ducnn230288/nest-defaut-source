import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import * as dayjs from 'dayjs';

import { Example } from '@common';
import { User } from '@modules/user/user.entity';
// import { UserHistory } from '@modules/user/user.history';
import { UserRole } from '@modules/user/role/role.entity';

import { P_AUTH_DELETE_IMAGE_TEMP } from '@auth/auth.service';
import {
  P_CODE_TYPE_CREATE,
  P_CODE_TYPE_DELETE,
  P_CODE_TYPE_DETAIL,
  P_CODE_TYPE_LISTED,
  P_CODE_TYPE_UPDATE,
} from '@modules/code/type/type.service';
import { P_CODE_CREATE, P_CODE_DELETE, P_CODE_DETAIL, P_CODE_LISTED, P_CODE_UPDATE } from '@modules/code/code.service';
import {
  P_USER_ROLE_CREATE,
  P_USER_ROLE_DELETE,
  P_USER_ROLE_DETAIL,
  P_USER_ROLE_LISTED,
  P_USER_ROLE_UPDATE,
} from '@modules/user/role/role.service';
import { P_USER_CREATE, P_USER_DELETE, P_USER_DETAIL, P_USER_LISTED, P_USER_UPDATE } from '@modules/user/user.service';

import {
  P_DATA_TYPE_CREATE,
  P_DATA_TYPE_DELETE,
  P_DATA_TYPE_LISTED,
  P_DATA_TYPE_UPDATE,
} from '@modules/data/type/type.service';
import { P_DATA_CREATE, P_DATA_DELETE, P_DATA_LISTED, P_DATA_UPDATE } from '@modules/data/data.service';
import { P_PAGE_CREATE, P_PAGE_DELETE, P_PAGE_LISTED, P_PAGE_UPDATE } from '@modules/page/page.service';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const dataRoleSuperAdmin: UserRole = {
      name: 'Supper Admin',
      permissions: [
        P_AUTH_DELETE_IMAGE_TEMP,

        P_CODE_TYPE_LISTED,
        P_CODE_TYPE_DETAIL,
        P_CODE_TYPE_CREATE,
        P_CODE_TYPE_UPDATE,
        P_CODE_TYPE_DELETE,

        P_CODE_LISTED,
        P_CODE_DETAIL,
        P_CODE_CREATE,
        P_CODE_UPDATE,
        P_CODE_DELETE,

        P_USER_ROLE_LISTED,
        P_USER_ROLE_DETAIL,
        P_USER_ROLE_CREATE,
        P_USER_ROLE_UPDATE,
        P_USER_ROLE_DELETE,

        P_USER_LISTED,
        P_USER_DETAIL,
        P_USER_CREATE,
        P_USER_DELETE,
        P_USER_UPDATE,

        P_DATA_TYPE_LISTED,
        P_DATA_TYPE_CREATE,
        P_DATA_TYPE_UPDATE,
        P_DATA_TYPE_DELETE,

        P_DATA_LISTED,
        P_DATA_CREATE,
        P_DATA_UPDATE,
        P_DATA_DELETE,

        P_PAGE_LISTED,
        P_PAGE_CREATE,
        P_PAGE_UPDATE,
        P_PAGE_DELETE,
      ],
      isSystemAdmin: false,
    };
    const repoRole = dataSource.getRepository(UserRole);
    const roleSuperAdminExists = await repoRole
      .createQueryBuilder('base')
      .andWhere(`base.name=:name`, { name: dataRoleSuperAdmin.name })
      .getOne();

    if (!roleSuperAdminExists) {
      const newDataRoleSuperAdmin = repoRole.create(dataRoleSuperAdmin);
      await repoRole.save(newDataRoleSuperAdmin);

      const repository = dataSource.getRepository(User);
      // const repositoryHistory = dataSource.getRepository(UserHistory);
      const data: User = {
        email: 'admin@admin.com',
        avatar: 'https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg',
        positionCode: 'DEV',
        roleId: newDataRoleSuperAdmin.id,
        name: faker.name.fullName(),
        password: Example.password,
        phoneNumber: faker.phone.number('0#########'),
        dob: faker.date.birthdate(),
        description: faker.lorem.paragraph(),
        startDate: faker.date.past(),
        dateOff: 0,
      };
      if (
        dayjs().endOf('year').toDate().toDateString() === dayjs(data.startDate).endOf('year').toDate().toDateString()
      ) {
        data.dateLeave = dayjs().diff(dayjs(data.startDate), 'months');
      } else {
        data.dateLeave = dayjs().startOf('year').diff(dayjs(data.startDate), 'months');
      }
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.email=:email`, { email: data.email })
        .getOne();

      if (!dataExists) {
        let newData = repository.create(data);
        newData = await repository.save(newData);
        // const originalID = newData.id;
        // delete newData.id;
        // delete newData.createdAt;
        // const newHistory = repositoryHistory.create(newData);
        // await repositoryHistory.save({ ...newHistory, originalID, action: 'CREATED' });
      }
    }
    // const userFactory = await factoryManager.get(CategoryType); factoryManager: SeederFactoryManager
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
