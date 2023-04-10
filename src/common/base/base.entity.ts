import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { MaxGroup } from '@common';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

@Entity()
export abstract class Base<T extends Base = any> {
  constructor(partial: Partial<T> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  id?: string;

  @DeleteDateColumn()
  isDeleted?: Date;

  @CreateDateColumn({ name: 'created_at' })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [MaxGroup] })
  readonly updatedAt?: Date;
}
