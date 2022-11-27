import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '../../../../../common';
import { UserRole } from '../../role.entity';

export class UserRoleResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: UserRole;
}
