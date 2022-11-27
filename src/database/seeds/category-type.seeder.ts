import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { CategoryType } from '../../modules/category/type/type.entity';

export class CategoryTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(CategoryType);
    const data: CategoryType = { name: 'Position', code: 'POS' };

    const dataExists = await repository.findOneBy({ code: data.code });

    if (!dataExists) {
      const newData = repository.create(data);
      await repository.save(newData);
    }

    // const userFactory = await factoryManager.get(CategoryType);
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
