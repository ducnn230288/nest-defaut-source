import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: faker.datatype.uuid() })
  id: string;

  @Column()
  @ApiProperty({ example: faker.company.companyName() })
  name: string;

  @ManyToMany(() => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
