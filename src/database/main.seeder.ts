import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';

import { CodeTypeSeeder } from './seeds/code-type.seeder';
import { CodeSeeder } from './seeds/code.seeder';
import { UserSeeder } from './seeds/user.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, CodeTypeSeeder);
    await runSeeder(dataSource, CodeSeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
