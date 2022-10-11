import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { Role } from '../role.entity';
import { Base } from '../../../../base/base.entity';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';

@Unique(['resourceName', 'creatorOnly', 'roleId'])
@Entity()
@Exclude()
export class Permission extends Base {
  @Column()
  @Expose()
  @Length(2)
  resourceName!: string;

  @Column({ default: false })
  @Expose()
  creatorOnly: boolean;

  @Column({ default: false })
  @Expose()
  canCreate: boolean;

  @Column({ default: false })
  @Expose()
  canRead: boolean;

  @Column({ default: false })
  @Expose()
  canUpdate: boolean;

  @Column({ default: false })
  @Expose()
  canDelete: boolean;

  @Column()
  @Expose()
  public roleId!: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  public role?: Role;
}

// Normal non admin user:
// Me resolver
//  -returns 'me' user with relations:
//    - submitted tickets & status
// Submit ticket (would redirect back to dashboard)
//  - View all categories
// View details of their submitted tickets, but
// not assignments.

// Admin user:
// Me resolver
// - same as above, plus:
//    - my feed resolver (assigned & subscribed)
