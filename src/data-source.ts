import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { MainSeeder } from './database/main.seeder';
import { CategoryType } from './modules/category/type/type.entity';
import { Category } from './modules/category/category.entity';
import { Page } from './modules/page/page.entity';
import { User } from './modules/user/user.entity';
import { UserRole } from './modules/user/role/role.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [CategoryType, Category, Page, User, UserRole],
  migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
};
export const AppDataSource = new DataSource(options);
