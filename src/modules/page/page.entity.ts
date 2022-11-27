import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base } from '../../common';

export const GROUP_PAGE = 'group_page_details';
export const GROUP_MIN_PAGE = 'group_min_page';

@Entity()
@Exclude()
export class Page extends Base {
  @Column()
  @Expose()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  name: string;

  @Column()
  @Expose()
  @IsString()
  slug: string;

  @Column({ default: false })
  @Expose()
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isHomePage: boolean;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @Expose({ groups: [GROUP_PAGE] })
  readonly content?: Record<string, any>;
}
