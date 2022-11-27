import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '../../../../../common';
import { CategoryType } from '../../type.entity';

export class ListCategoryTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CategoryType[];
}
