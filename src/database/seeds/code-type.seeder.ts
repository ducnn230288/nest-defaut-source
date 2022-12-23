import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { CodeType } from '@modules/code/type/type.entity';

export class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(CodeType);
    const data: CodeType = { name: 'Position', code: 'POS', isPrimary: true };

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
