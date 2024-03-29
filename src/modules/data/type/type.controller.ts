import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, RelationGroup, SerializerBody } from '@common';
import {
  ArrayDataTypeResponseDto,
  CreateDataTypeRequestDto,
  DataTypeResponseDto,
  ListDataTypeResponseDto,
  UpdateDataTypeRequestDto,
} from './dto';
import {
  DataTypeService,
  P_DATA_TYPE_CREATE,
  P_DATA_TYPE_DELETE,
  P_DATA_TYPE_LISTED,
  P_DATA_TYPE_UPDATE,
} from './type.service';

@Headers('data-type')
export class DataTypeController {
  constructor(private readonly service: DataTypeService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_DATA_TYPE_LISTED,
  })
  @Get()
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListDataTypeResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup, RelationGroup] },
  })
  @Get('/array')
  async findOneByArray(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) query: { array: string[] },
  ): Promise<ArrayDataTypeResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findArrayCode(query.array),
    };
  }

  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [RelationGroup] },
  })
  @Get(':code')
  async findOne(@I18n() i18n: I18nContext, @Param('code') code: string): Promise<DataTypeResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findCode(code),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_DATA_TYPE_CREATE,
  })
  @Post()
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateDataTypeRequestDto,
  ): Promise<DataTypeResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_DATA_TYPE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateDataTypeRequestDto,
  ): Promise<DataTypeResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_DATA_TYPE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataTypeResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
