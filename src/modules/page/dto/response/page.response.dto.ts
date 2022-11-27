import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '../../../../common';
import { Page } from '../../page.entity';

export class PageResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Page;
}
