import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DefaultResponsesDto } from '../../common/dto/default.responses.dto';

export class DefaultAuthResponsesDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesDataDto;
}

class DefaultAuthResponsesDataDto extends PartialType(OmitType(User, ['password'] as const)) {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZheWU4NCIsInN1YiI6ImM5YjE5MDFkLTI0YTctNDU3Ny04ZWZlLTA3NDQwOWRiZmI5ZSIsImlhdCI6MTY1NzA2NjU4OSwiZXhwIjoxNjU3MDcwMTg5fQ.EVP1e-CJdEK4BVDOcfgOPDvNqzaqSjWrCYD3zhRdxUM',
  })
  readonly token?: string;
}
