import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: faker.datatype.uuid() })
  id: string;

  @Column()
  @ApiProperty({ example: faker.name.jobArea() })
  name: string;
  //
  // @Column()
  // permissions: [Permission];
}
