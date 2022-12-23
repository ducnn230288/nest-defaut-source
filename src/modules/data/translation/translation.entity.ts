import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base, MaxGroup } from '@common';
import { Data } from '@modules/data/data.entity';

@Entity()
@Exclude()
export class DataTranslation extends Base {
  @Column()
  @Expose()
  @IsString()
  language: string;

  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @Expose()
  @IsString()
  name: string;

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
  @Expose({ groups: [MaxGroup] })
  @IsOptional()
  readonly content?: Record<string, any>;

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsString()
  @IsOptional()
  dataId?: string;

  @ManyToOne(() => Data, (data) => data.translations, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  public data?: Data;
}
