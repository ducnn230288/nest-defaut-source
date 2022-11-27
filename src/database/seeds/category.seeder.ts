import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Category } from '../../modules/category/category.entity';

export class CategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);
    const listData: Category[] = [
      { name: 'President & CEO', code: 'PC', type: 'POS' },
      { name: 'CCO', code: 'CCO', type: 'POS' },
      { name: 'Vice Director', code: 'VD', type: 'POS' },
      { name: 'Vice Director', code: 'VD', type: 'POS' },
      { name: 'Delivery Manager', code: 'DM', type: 'POS' },
      { name: 'CTO', code: 'CTO', type: 'POS' },
      { name: 'Admin', code: 'AD', type: 'POS' },
      { name: 'Accountant', code: 'ACC', type: 'POS' },
      { name: 'Ai Technical Leader', code: 'ATL', type: 'POS' },
      { name: 'Web-App Technical Leader', code: 'WATL', type: 'POS' },
      { name: 'Project Technical Leader', code: 'PTL', type: 'POS' },
      { name: 'Developer', code: 'DEV', type: 'POS' },
      { name: 'Engineer', code: 'ENG', type: 'POS' },
      { name: 'Business Analyst', code: 'BA', type: 'POS' },
      { name: 'Tester', code: 'TEST', type: 'POS' },
    ];

    for (const data of listData) {
      const dataExists = await repository.findOneBy({ code: data.code });

      if (!dataExists) {
        const newData = repository.create(data);
        await repository.save(newData);
      }
    }

    // const userFactory = await factoryManager.get(CategoryType);
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
