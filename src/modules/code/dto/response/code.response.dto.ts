import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { Code } from '../../code.entity';

export class CodeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Code;
}
