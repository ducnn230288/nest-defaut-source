import { ApiProperty, PartialType } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { DefaultResponsesDto } from './default.responses.dto';

export class PaginationResponsesDto extends PartialType(DefaultResponsesDto) {
  @ApiProperty({ example: faker.random.numeric(), description: '' })
  count: number;
}
