import { BeforeInsert, Column, Entity, ManyToOne, BeforeUpdate, JoinColumn } from 'typeorm';
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
  MaxLength,
  MinLength,
} from 'class-validator';
import * as bcrypt from 'bcrypt';

import { Base, Example } from '../../common';
import { UserRole } from './role/role.entity';
import { Category } from '../category/category.entity';

export const GROUP_USER = 'group_user_details';
export const GROUP_MIN_USER = 'group_min_user';

@Entity()
// @Unique(['email', 'phoneNumber'])
@Exclude()
export class User extends Base {
  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_MIN_USER] })
  @ApiProperty({ example: faker.name.fullName(), description: '' })
  @IsString()
  readonly name: string;

  @Column({ nullable: true })
  @Expose({ groups: [GROUP_USER, GROUP_MIN_USER] })
  @ApiProperty({ example: faker.image.imageUrl(), description: '' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @Column()
  @ApiProperty({ example: Example.password, description: '' })
  @MinLength(6)
  password?: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?() {
    this.password = this.password && (await bcrypt.hash(this.password, 10));
  }

  @Column({ nullable: true })
  refreshToken?: string;
  @BeforeUpdate()
  async hashRefreshToken?() {
    this.refreshToken = this.refreshToken && (await bcrypt.hash(this.refreshToken, 10));
  }

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_MIN_USER] })
  @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
  @IsEmail()
  readonly email: string;

  @Column()
  @Expose({ groups: [GROUP_USER, GROUP_MIN_USER] })
  @ApiProperty({ example: faker.phone.number('0#########'), description: '' })
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  readonly phoneNumber: string;

  @Column()
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.date.birthdate(), description: '' })
  @IsDateString()
  readonly dob: Date;

  @Column({ nullable: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @Column({ nullable: true })
  @Expose({ groups: [GROUP_USER] })
  @IsString()
  @IsOptional()
  roleId?: string;

  @ManyToOne(() => UserRole, (role) => role.users, { eager: true }) //
  @Type(() => UserRole)
  @Expose({ groups: [GROUP_USER] })
  readonly role?: UserRole;

  @Column({ nullable: true })
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: 'DEV', description: '' })
  @IsString()
  readonly positionCode: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'positionCode', referencedColumnName: 'code' })
  @Expose({ groups: [GROUP_USER] })
  readonly position?: Category;

  @Column()
  @Expose({ groups: [GROUP_USER] })
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  readonly startDate?: Date;

  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.datatype.number({ min: 0.5, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  dateLeave: number;

  @Column({ nullable: true, type: 'real', default: 0 })
  @Expose()
  @ApiProperty({ example: faker.datatype.number({ min: 0.5, max: 12 }), description: '' })
  @IsDecimal()
  readonly dateOff: number;
}
