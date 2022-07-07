import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateCoffeeRequestDto {
  @ApiProperty({ example: faker.name.firstName(), description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: faker.company.companyName(), description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [], description: '' })
  @IsString({ each: true })
  readonly flavors: string[];
}
