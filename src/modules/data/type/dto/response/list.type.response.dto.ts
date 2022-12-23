import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { DataType } from '../../type.entity';

export class ListDataTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: DataType[];
}
