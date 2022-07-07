import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class DefaultResponsesDto {
  @ApiProperty({ example: faker.lorem.sentence(), description: '' })
  message: string;
}
