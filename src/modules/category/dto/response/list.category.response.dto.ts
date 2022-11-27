import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '../../../../common';
import { Category } from '../../category.entity';

export class ListCategoryResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Category[];
}
