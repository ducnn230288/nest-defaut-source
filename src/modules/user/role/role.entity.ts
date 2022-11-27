import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { Base } from '../../../common/';
import { User } from '../user.entity';

export const GROUP_USER_ROLE = 'group_user_role';
export const GROUP_ALL_USER_ROLE = 'group_all_user_role';

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
  @Expose({ groups: [GROUP_ALL_USER_ROLE] })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isSystemAdmin: boolean;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @Expose({ groups: [GROUP_ALL_USER_ROLE] })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  readonly permissions?: Record<string, any>;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
