import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Expose, Type } from 'class-transformer';

import { BaseHistory, MaxGroup } from '@common';
import { Code } from '@modules/code/code.entity';

@Entity()
// @Unique(['email', 'phoneNumber'])
export class UserHistory extends BaseHistory {
  @Column()
  readonly name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  readonly email: string;

  @Column()
  readonly phoneNumber: string;

  @Column()
  dob: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  readonly positionCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'positionCode', referencedColumnName: 'code' })
  readonly position?: Code;
}
