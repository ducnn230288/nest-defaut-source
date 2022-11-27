import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@Entity()
export abstract class Base<T extends Base = any> {
  constructor(partial: Partial<T> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  readonly id?: string;

  @DeleteDateColumn()
  @Expose()
  isDeleted?: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Expose()
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose()
  readonly updatedAt?: Date;
}
