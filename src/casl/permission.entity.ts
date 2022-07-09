import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Action } from './userRoles';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: faker.datatype.uuid() })
  id: string;

  @Column({ type: 'enum', enum: Action })
  @ApiProperty({ example: faker.name.jobType() })
  action: string;

  @Column({ type: 'string' })
  @ApiProperty({ example: faker.name.jobTitle() })
  subject: string;
}
