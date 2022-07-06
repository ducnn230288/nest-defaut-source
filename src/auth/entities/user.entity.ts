import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  @ApiProperty({ example: faker.datatype.uuid() })
  readonly id: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  @ApiProperty({ example: faker.name.firstName() })
  readonly firstName: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  @ApiProperty({ example: faker.name.lastName() })
  readonly lastName: string;

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.internet.userName().toLowerCase() })
  readonly username: string;

  @Column()
  @Exclude()
  readonly password: string;

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.internet.email().toLowerCase() })
  readonly email: string;
}
