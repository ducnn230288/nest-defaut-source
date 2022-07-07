import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Flavor } from './flavor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  id: string;

  @Column()
  @ApiProperty({ example: faker.name.firstName(), description: '' })
  name: string;

  @Column()
  @ApiProperty({ example: faker.company.companyName(), description: '' })
  brand: string;

  @Column({ default: 0 })
  @ApiProperty({ example: faker.random.numeric(), description: '' })
  recommendations: number;

  // @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
