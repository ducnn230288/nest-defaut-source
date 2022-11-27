import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base } from '../../common';
import { CategoryType } from './type/type.entity';

@Entity()
@Unique(['code'])
@Exclude()
export class Category extends Base {
  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose()
  @IsString()
  code: string;

  @Column()
  @ApiProperty({ example: faker.name.jobArea(), description: '' })
  @Expose()
  @IsString()
  type: string;

  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @Expose()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @Expose()
  @IsString()
  @IsOptional()
  subName?: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.image.imageUrl(), description: '' })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.datatype.number({ min: 0 }), description: '' })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
  })
  @Expose()
  @IsOptional()
  readonly content?: Record<string, any>;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  @Expose()
  @IsOptional()
  readonly attribute?: Record<string, any>;

  @ManyToOne(() => CategoryType, (categoryType) => categoryType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  public item?: CategoryType;
}
