import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { Base } from '@common';
import { User } from '../user.entity';

@Entity()
// @Unique(['name'])
@Exclude()
export class UserRole extends Base {
  @Column()
  @Expose()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ default: false })
  @Expose()
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isSystemAdmin: boolean;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @Expose()
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  readonly permissions?: Record<string, any>;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
