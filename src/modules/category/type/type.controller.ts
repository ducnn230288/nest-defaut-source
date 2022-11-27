import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '../../../common';
import {
  CategoryTypeResponseDto,
  ListCategoryTypeResponseDto,
  CreateCategoryTypeRequestDto,
  UpdateCategoryTypeRequestDto,
} from './dto';
import {
  CategoryTypeService,
  P_CATEGORY_TYPE_LISTED,
  P_CATEGORY_TYPE_DETAIL,
  P_CATEGORY_TYPE_CREATE,
  P_CATEGORY_TYPE_UPDATE,
  P_CATEGORY_TYPE_DELETE,
} from './type.service';

import { GROUP_ALL_CATEGORY_TYPE, GROUP_CATEGORY_TYPE } from './type.entity';

@Headers('category-type')
export class CategoryTypeController {
  constructor(private readonly service: CategoryTypeService) {}

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [GROUP_CATEGORY_TYPE] },
    permission: P_CATEGORY_TYPE_LISTED,
  })
  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListCategoryTypeResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: 'Get List success',
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    serializeOptions: { groups: [GROUP_ALL_CATEGORY_TYPE] },
    permission: P_CATEGORY_TYPE_DETAIL,
  })
  @Get(':code')
  async findOne(@Param('code') code: string): Promise<CategoryTypeResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.findOneCode(code),
    };
  }

  @Auth({
    summary: 'Create data',
    serializeOptions: { groups: [GROUP_CATEGORY_TYPE] },
    permission: P_CATEGORY_TYPE_CREATE,
  })
  @Post()
  async create(
    @Body(new SerializerBody([GROUP_CATEGORY_TYPE])) body: CreateCategoryTypeRequestDto,
  ): Promise<CategoryTypeResponseDto> {
    return {
      message: 'create Success',
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    serializeOptions: { groups: [GROUP_CATEGORY_TYPE] },
    permission: P_CATEGORY_TYPE_UPDATE,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody([GROUP_CATEGORY_TYPE])) body: UpdateCategoryTypeRequestDto,
  ): Promise<CategoryTypeResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    serializeOptions: { groups: [GROUP_CATEGORY_TYPE] },
    permission: P_CATEGORY_TYPE_DELETE,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CategoryTypeResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.service.remove(id),
    };
  }
}
