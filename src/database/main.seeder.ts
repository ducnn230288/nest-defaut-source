import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';

import { CategoryTypeSeeder } from './seeds/category-type.seeder';
import { CategorySeeder } from './seeds/category.seeder';
import { UserSeeder } from './seeds/user.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, CategoryTypeSeeder);
    await runSeeder(dataSource, CategorySeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
