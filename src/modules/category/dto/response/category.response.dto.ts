import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '../../../../common';
import { Category } from '../../category.entity';

export class CategoryResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Category;
}
