import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base } from '../../../common';
import { Category } from '../category.entity';

export const GROUP_CATEGORY_TYPE = 'group_category_type';
export const GROUP_ALL_CATEGORY_TYPE = 'group_all_category_type';

@Entity()
@Unique(['code'])
@Exclude()
export class CategoryType extends Base {
  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @Expose({ groups: [GROUP_CATEGORY_TYPE, GROUP_ALL_CATEGORY_TYPE] })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose({ groups: [GROUP_CATEGORY_TYPE, GROUP_ALL_CATEGORY_TYPE] })
  @IsString()
  code: string;

  @OneToMany(() => Category, (category) => category.item, { eager: true })
  @Expose({ groups: [GROUP_ALL_CATEGORY_TYPE] })
  items?: Category[];
}
