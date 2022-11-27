import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '../../common';
import {
  CategoryResponseDto,
  ListCategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from './dto';
import {
  CategoryService,
  P_CATEGORY_LISTED,
  P_CATEGORY_DETAIL,
  P_CATEGORY_CREATE,
  P_CATEGORY_UPDATE,
  P_CATEGORY_DELETE,
} from './category.service';

@Headers('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_CATEGORY_LISTED,
  })
  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListCategoryResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: 'Get List success',
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_CATEGORY_DETAIL,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.findOne(id),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_CATEGORY_CREATE,
  })
  @Post()
  async create(@Body(new SerializerBody()) body: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    return {
      message: 'create Success',
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_CATEGORY_UPDATE,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_CATEGORY_DELETE,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CategoryResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.service.remove(id),
    };
  }
}
