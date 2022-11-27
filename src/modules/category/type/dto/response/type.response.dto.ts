import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '../../../../../common';
import { CategoryType } from '../../type.entity';

export class CategoryTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CategoryType;
}
