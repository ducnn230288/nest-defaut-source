import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { DataType } from '../../type.entity';

export class DataTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DataType;
}
