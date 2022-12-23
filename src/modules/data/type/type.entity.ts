import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base, RelationGroup } from '@common';
import { Data } from '../data.entity';

@Entity()
@Unique(['code'])
@Exclude()
export class DataType extends Base {
  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @Expose()
  @IsString()
  name: string;

  @Column()
  @Expose()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @IsString()
  code: string;

  @Column({ default: false })
  @Expose()
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isPrimary: boolean;

  @OneToMany(() => Data, (data) => data.item, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [RelationGroup] })
  items?: Data[];
}
