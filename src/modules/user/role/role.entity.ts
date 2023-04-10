import { Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { Base } from '@common';
import { User } from '../user.entity';

@Entity()
// @Unique(['name'])
export class UserRole extends Base {
  @Column()
  @ApiProperty({ example: faker.name.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isSystemAdmin: boolean;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  readonly permissions?: Record<string, any>;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
