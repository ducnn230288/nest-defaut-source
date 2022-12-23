import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { Data } from '../../data.entity';

export class ListDataResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Data[];
}
