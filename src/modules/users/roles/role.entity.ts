import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Permission } from './permissions/permission.entity';
import { User } from '../user.entity';
import { Base } from '../../../base/base.entity';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';

@Entity()
@Unique(['name'])
@Exclude()
export class Role extends Base {
  @Column()
  @Expose()
  @Length(2)
  name: string;

  @Column({ default: false })
  @Expose()
  isSystemAdmin: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: Promise<User[]>;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Promise<Permission[]>;
}
