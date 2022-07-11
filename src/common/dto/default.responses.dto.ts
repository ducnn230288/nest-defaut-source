import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class DefaultResponsesDto {
  @ApiProperty({ example: 200, description: '' })
  statusCode?: number;
  @ApiProperty({ example: faker.lorem.sentence(), description: '' })
  message: string;
}
