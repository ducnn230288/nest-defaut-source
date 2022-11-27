import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '../../common';
import { ListPageResponseDto, PageResponseDto, CreatePageRequestDto, UpdatePageRequestDto } from './dto';
import { PageService, P_PAGE_LISTED, P_PAGE_DETAIL, P_PAGE_CREATE, P_PAGE_UPDATE, P_PAGE_DELETE } from './page.service';
import { GROUP_MIN_PAGE, GROUP_PAGE } from './page.entity';

@Headers('page')
export class PageController {
  constructor(private readonly service: PageService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_PAGE_LISTED,
    serializeOptions: { groups: [GROUP_MIN_PAGE] },
  })
  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListPageResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: 'Get List success',
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_PAGE_DETAIL,
    serializeOptions: { groups: [GROUP_PAGE] },
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PageResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.findOne(id),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_PAGE_CREATE,
    serializeOptions: { groups: [GROUP_PAGE] },
  })
  @Post()
  async create(@Body(new SerializerBody()) body: CreatePageRequestDto): Promise<PageResponseDto> {
    return {
      message: 'create Success',
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_PAGE_UPDATE,
    serializeOptions: { groups: [GROUP_PAGE] },
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdatePageRequestDto, //
  ): Promise<PageResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_PAGE_DELETE,
    serializeOptions: { groups: [GROUP_PAGE] },
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PageResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.service.remove(id),
    };
  }
}
