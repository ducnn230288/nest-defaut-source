import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { CodeType } from '../../type.entity';

export class CodeTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CodeType;
}
