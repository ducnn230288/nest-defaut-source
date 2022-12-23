import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { Base, RelationGroup } from '@common';
import { DataType } from './type/type.entity';
import { DataTranslation } from '@modules/data/translation/translation.entity';

@Entity()
@Exclude()
export class Data extends Base {
  @Column()
  @ApiProperty({ example: faker.name.jobArea(), description: '' })
  @Expose()
  @IsString()
  type: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.image.imageUrl(), description: '' })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.datatype.number({ min: 0 }), description: '' })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @ManyToOne(() => DataType, (dataType) => dataType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  @Expose({ groups: [RelationGroup] })
  public item?: DataType;

  @OneToMany(() => DataTranslation, (data) => data.data, { eager: true })
  @Expose({ groups: [RelationGroup] })
  @IsArray()
  public translations?: DataTranslation[];
}
