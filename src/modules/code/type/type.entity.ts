import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Base, MaxGroup } from '@common';
import { Code } from '../code.entity';

@Entity()
@Unique(['code'])
export class CodeType extends Base {
  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @IsString()
  code: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isPrimary?: boolean;

  @OneToMany(() => Code, (category) => category.item, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [MaxGroup] })
  items?: Code[];
}
