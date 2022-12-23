import { PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { User } from '../../user.entity';

export class UserResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: User;
}
