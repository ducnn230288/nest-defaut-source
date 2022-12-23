import { PartialType } from '@nestjs/swagger';

import { PaginationResponsesDto } from '@common';
import { UserRole } from '../../role.entity';

export class ListUserRoleResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: UserRole[];
}
