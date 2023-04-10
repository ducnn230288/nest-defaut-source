import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { MainSeeder } from '@database/main.seeder';
import { CodeType } from '@modules/code/type/type.entity';
import { Code } from '@modules/code/code.entity';
import { User } from '@modules/user/user.entity';
import { UserRole } from '@modules/user/role/role.entity';
import { Data } from '@modules/data/data.entity';
import { DataTranslation } from '@modules/data/translation/translation.entity';
import { DataType } from '@modules/data/type/type.entity';
import { Page } from '@modules/page/page.entity';
import { PageTranslation } from '@modules/page/translation/translation.entity';
import { member1669372347132 } from '@database/migrations/1668566358184-member';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [CodeType, Code, User, UserRole, Page, PageTranslation, Data, DataTranslation, DataType],
  migrations: [member1669372347132],
  seeds: [MainSeeder],
};
export const AppDataSource = new DataSource(options);
