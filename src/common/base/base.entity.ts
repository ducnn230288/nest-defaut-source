import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { MaxGroup } from '@common';
import { IsDateString, IsOptional } from 'class-validator';

@Entity()
@Exclude()
export abstract class Base<T extends Base = any> {
  constructor(partial: Partial<T> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  id?: string;

  @DeleteDateColumn()
  isDeleted?: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Expose()
  @IsDateString()
  @IsOptional()
  readonly createdAt?: Date;
  @Expose({ groups: [MaxGroup] })
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [MaxGroup] })
  readonly updatedAt?: Date;
}
