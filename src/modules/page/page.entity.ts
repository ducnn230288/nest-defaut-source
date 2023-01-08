import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base, RelationGroup } from '@common';
import { PageTranslation } from '@modules/page/translation/translation.entity';

@Entity()
@Exclude()
export class Page extends Base {
  @Column()
  @Expose()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: 'style1', description: '' })
  @IsString()
  @IsOptional()
  style: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.datatype.number({ min: 0 }), description: '' })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: null, description: '' })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ManyToMany(() => Page)
  @JoinTable()
  @Expose()
  @IsArray()
  @IsOptional()
  children?: Page[];

  @OneToMany(() => PageTranslation, (data) => data.page, { eager: true })
  @Expose({ groups: [RelationGroup] })
  @IsArray()
  translations?: PageTranslation[];
}
