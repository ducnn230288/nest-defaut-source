import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Flavor } from '../flavor/flavor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  id: string;

  @Column()
  @ApiProperty({ example: faker.name.firstName(), description: '' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.company.companyName(), description: '' })
  @IsString()
  brand: string;

  @Column({ default: 0 })
  @ApiProperty({ example: faker.random.numeric(), description: '' })
  recommendations: number;

  // @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  @IsString({ each: true })
  flavors: Flavor[];
}
