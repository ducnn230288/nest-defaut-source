import { setSeederFactory } from 'typeorm-extension';
import { CategoryType } from '../../modules/category/type/type.entity';

export default setSeederFactory(CategoryType, (faker) => {
  const data = new CategoryType();
  data.name = faker.name.jobType();
  data.code = faker.finance.bic();

  return data;
});
