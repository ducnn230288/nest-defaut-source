import { PartialType } from '@nestjs/swagger';
import { DefaultResponsesDto } from '../../../../../common';

export class PermissionResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: string[];
}
