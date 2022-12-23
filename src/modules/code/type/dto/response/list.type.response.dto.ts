import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { CodeType } from '../../type.entity';

export class ListCodeTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CodeType[];
}
