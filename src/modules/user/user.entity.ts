import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
  IsDateString,
  IsDecimal,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

import { Base, Example, MaxGroup, OnlyUpdateGroup } from '@common';
import { UserRole } from './role/role.entity';
import { Code } from '../code/code.entity';

@Entity()
// @Unique(['email', 'phoneNumber'])
export class User extends Base {
  @Column()
  @ApiProperty({ example: faker.name.fullName(), description: '' })
  @IsString()
  readonly name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.imageUrl(), description: '' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @Column()
  @Expose({ groups: [OnlyUpdateGroup] })
  @ApiProperty({ example: Example.password, description: '' })
  @MinLength(6)
  @MaxLength(59)
  @IsOptional()
  password?: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?() {
    if (this.password && this.password.length < 60) {
      this.password = this.password && (await bcrypt.hash(this.password, 10));
    }
  }

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;
  @BeforeUpdate()
  async hashRefreshToken?() {
    this.refreshToken = this.refreshToken && (await bcrypt.hash(this.refreshToken, 10));
  }

  @Column({ nullable: true })
  @Exclude()
  resetPasswordToken?: string;

  @Column()
  @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
  @IsEmail()
  readonly email: string;

  @Column()
  @ApiProperty({ example: faker.phone.number('0#########'), description: '' })
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  readonly phoneNumber: string;

  @Column()
  @ApiProperty({ example: faker.date.birthdate(), description: '' })
  @IsDateString()
  dob: Date;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  roleId?: string;

  @ManyToOne(() => UserRole, (role) => role.users, { eager: true }) //
  @Type(() => UserRole)
  @Expose({ groups: [MaxGroup] })
  readonly role?: UserRole;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: 'DEV', description: '' })
  @IsString()
  @IsOptional()
  readonly positionCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'positionCode', referencedColumnName: 'code' })
  readonly position?: Code;

  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  startDate?: Date;

  @Column({ nullable: true, type: 'real' })
  @ApiProperty({ example: faker.datatype.number({ min: 0.5, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  dateLeave?: number;

  @Column({ nullable: true, type: 'real', default: 0 })
  @ApiProperty({ example: faker.datatype.number({ min: 0.5, max: 12 }), description: '' })
  @IsDecimal()
  readonly dateOff: number;
}
