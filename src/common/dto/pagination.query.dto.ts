import { IsOptional, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  perPage: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  filter?: string | object;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  sorts?: any;

  @IsOptional()
  fullTextSearch?: string;

  where?: object[];
}
