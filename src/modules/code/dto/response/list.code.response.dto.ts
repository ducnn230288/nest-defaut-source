import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { Code } from '../../code.entity';

export class ListCodeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Code[];
}
