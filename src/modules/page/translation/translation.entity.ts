import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base, MaxGroup } from '@common';
import { Page } from '../page.entity';
import { faker } from '@faker-js/faker';

@Entity()
@Exclude()
export class PageTranslation extends Base {
  @Column()
  @Expose()
  @ApiProperty({ example: 'en', description: '' })
  @IsString()
  language: string;

  @Column()
  @Expose()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  title: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  @IsString()
  @IsOptional()
  slug: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  seoDescription: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  readonly content?: Record<string, any>;

  @Column()
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  @IsString()
  @IsOptional()
  pageId?: string;

  @ManyToOne(() => Page, (data) => data.translations, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [MaxGroup] })
  public page?: Page;
}
