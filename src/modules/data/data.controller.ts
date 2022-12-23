import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, RelationGroup, SerializerBody } from '@common';
import { DataResponseDto, ListDataResponseDto, CreateDataRequestDto, UpdateDataRequestDto } from './dto';
import { DataService, P_DATA_LISTED, P_DATA_CREATE, P_DATA_UPDATE, P_DATA_DELETE } from './data.service';

@Headers('data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_DATA_LISTED,
    serializeOptions: { groups: [RelationGroup] },
  })
  @Get()
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListDataResponseDto> {
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
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_DATA_CREATE,
    serializeOptions: { groups: [RelationGroup] },
  })
  @Post()
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, RelationGroup])) body: CreateDataRequestDto,
  ): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_DATA_UPDATE,
    serializeOptions: { groups: [RelationGroup] },
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup, RelationGroup])) body: UpdateDataRequestDto,
  ): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_DATA_DELETE,
    serializeOptions: { groups: [RelationGroup] },
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
