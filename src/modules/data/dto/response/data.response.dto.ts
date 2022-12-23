import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { Data } from '../../data.entity';

export class DataResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Data;
}
