import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { PageTranslation } from '../../translation.entity';

export class ListPageTranslationResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: PageTranslation[];
}
