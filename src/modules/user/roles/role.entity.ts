import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Permission } from './permissions/permission.entity';
import { User } from '../entities/user.entity';
import { Base } from '../../../base/base.entity';

@Entity()
@Unique(['name'])
export class Role extends Base {
  @Column()
  name!: string;

  @Column({ default: false })
  isSystemAdmin!: boolean;

  @OneToMany(() => User, (user) => user.role)
  users?: Promise<User[]>;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions?: Promise<Permission[]>;
}
