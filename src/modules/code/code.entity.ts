import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base } from '@common';
import { CodeType } from './type/type.entity';

@Entity()
@Unique(['code'])
@Exclude()
export class Code extends Base {
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
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @ManyToOne(() => CodeType, (codeType) => codeType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  public item?: CodeType;
}
