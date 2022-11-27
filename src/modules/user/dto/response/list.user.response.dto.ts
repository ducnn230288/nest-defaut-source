import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '../../../../common';
import { User } from '../../user.entity';

export class ListUserResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: User[];
}
