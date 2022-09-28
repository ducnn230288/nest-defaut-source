import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../../user.entity';
import { DefaultResponsesDto } from '../../../../common/dto/default.responses.dto';

export class ProfileAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProfileAuthResponsesDataDto;
}

class ProfileAuthResponsesDataDto extends PartialType(OmitType(User, ['password'] as const)) {}
