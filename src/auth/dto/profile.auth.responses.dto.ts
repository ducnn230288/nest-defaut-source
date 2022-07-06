import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DefaultResponsesDto } from '../../common/dto/default.responses.dto';

export class ProfileAuthResponsesDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProfileAuthResponsesDataDto;
}

class ProfileAuthResponsesDataDto extends PartialType(OmitType(User, ['password'] as const)) {}
