import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { Page } from '../../page.entity';

export class ListPageResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Page[];
}
