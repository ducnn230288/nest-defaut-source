import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.entity';
import { Base } from '../../../base/base.entity';
import { Length } from 'class-validator';

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Entity()
@Exclude()
export class User extends Base {
  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  @ApiProperty({ example: faker.name.firstName(), description: '' })
  readonly firstName: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  @ApiProperty({ example: faker.name.lastName(), description: '' })
  readonly lastName: string;

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.internet.userName().toLowerCase(), description: '' })
  @Length(5)
  readonly username: string;

  @Column()
  @Length(8)
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
  readonly email: string;

  @Column({ nullable: true })
  roleId?: string;

  @ManyToOne(() => Role, (role) => role.users)
  @Type(() => Role)
  role?: Promise<Role>;
}
