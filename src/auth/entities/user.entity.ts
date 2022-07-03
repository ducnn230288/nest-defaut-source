import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  id: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  firstName: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  lastName: string;

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Expose({ groups: [GROUP_USER] })
  email: string;
}
