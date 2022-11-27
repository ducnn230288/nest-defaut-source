import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';

import { Example } from '../../common';
import { User } from '../../modules/user/user.entity';
import { UserRole } from '../../modules/user/role/role.entity';

import {
  P_CATEGORY_TYPE_LISTED,
  P_CATEGORY_TYPE_DETAIL,
  P_CATEGORY_TYPE_CREATE,
  P_CATEGORY_TYPE_UPDATE,
  P_CATEGORY_TYPE_DELETE,
} from '../../modules/category/type/type.service';
import {
  P_CATEGORY_LISTED,
  P_CATEGORY_DETAIL,
  P_CATEGORY_CREATE,
  P_CATEGORY_UPDATE,
  P_CATEGORY_DELETE,
} from '../../modules/category/category.service';
import {
  P_PAGE_LISTED,
  P_PAGE_DETAIL,
  P_PAGE_CREATE,
  P_PAGE_UPDATE,
  P_PAGE_DELETE,
} from '../../modules/page/page.service';
import {
  P_USER_LISTED,
  P_USER_DETAIL,
  P_USER_CREATE,
  P_USER_UPDATE,
  P_USER_DELETE,
} from '../../modules/user/user.service';
import {
  P_USER_ROLE_LISTED,
  P_USER_ROLE_DETAIL,
  P_USER_ROLE_CREATE,
  P_USER_ROLE_UPDATE,
  P_USER_ROLE_DELETE,
} from '../../modules/user/role/role.service';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const dataRoleSuperAdmin: UserRole = {
      name: 'Supper Admin',
      permissions: [
        P_CATEGORY_TYPE_LISTED,
        P_CATEGORY_TYPE_DETAIL,
        P_CATEGORY_TYPE_CREATE,
        P_CATEGORY_TYPE_UPDATE,
        P_CATEGORY_TYPE_DELETE,

        P_CATEGORY_LISTED,
        P_CATEGORY_DETAIL,
        P_CATEGORY_CREATE,
        P_CATEGORY_UPDATE,
        P_CATEGORY_DELETE,

        P_PAGE_LISTED,
        P_PAGE_DETAIL,
        P_PAGE_CREATE,
        P_PAGE_UPDATE,
        P_PAGE_DELETE,

        P_USER_LISTED,
        P_USER_DETAIL,
        P_USER_CREATE,
        P_USER_DELETE,
        P_USER_UPDATE,

        P_USER_ROLE_LISTED,
        P_USER_ROLE_DETAIL,
        P_USER_ROLE_CREATE,
        P_USER_ROLE_UPDATE,
        P_USER_ROLE_DELETE,
      ],
      isSystemAdmin: false,
    };
    const repoRole = dataSource.getRepository(UserRole);
    const roleSuperAdminExists = await repoRole.findOneBy({ name: dataRoleSuperAdmin.name });

    if (!roleSuperAdminExists) {
      const newDataRoleSuperAdmin = repoRole.create(dataRoleSuperAdmin);
      await repoRole.save(newDataRoleSuperAdmin);

      const repository = dataSource.getRepository(User);
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
        dateLeave: faker.datatype.number({ min: 0.5, max: 12 }),
        dateOff: faker.datatype.number({ min: 0.5, max: 12 }),
      };
      const dataExists = await repository.findOneBy({ email: data.email });

      if (!dataExists) {
        const newData = repository.create(data);
        await repository.save(newData);
      }
    }
    // const userFactory = await factoryManager.get(CategoryType); factoryManager: SeederFactoryManager
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
