import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { DataType } from '../../type.entity';

export class ArrayDataTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: { [key: string]: DataType };
}
