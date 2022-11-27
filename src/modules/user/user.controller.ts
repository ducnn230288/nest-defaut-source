import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as moment from 'moment';

import { Auth, Headers, SerializerBody, PaginationQueryDto } from '../../common';
import { CreateUserRequestDto, UpdateUserRequestDto, ListUserResponseDto, UserResponseDto } from './dto';
import { UserService, P_USER_LISTED, P_USER_DETAIL, P_USER_CREATE, P_USER_UPDATE, P_USER_DELETE } from './user.service';
import { GROUP_USER } from './user.entity';

@Headers('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Auth({
    summary: 'Get List User',
    serializeOptions: { groups: [GROUP_USER] },
    permission: P_USER_LISTED,
  })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<ListUserResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: 'Get List success',
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail User',
    serializeOptions: { groups: [GROUP_USER] },
    permission: P_USER_DETAIL,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.findOne(id),
    };
  }

  @Auth({
    summary: 'Create User',
    serializeOptions: { groups: [GROUP_USER] },
    permission: P_USER_CREATE,
  })
  @Post()
  async create(@Body(new SerializerBody([GROUP_USER])) createData: CreateUserRequestDto): Promise<any> {
    createData.dateLeave = moment().endOf('year').diff(createData.startDate, 'months');
    return {
      message: 'Create Success',
      data: await this.service.create(createData),
    };
  }

  @Auth({
    summary: 'Update User',
    serializeOptions: { groups: [GROUP_USER] },
    permission: P_USER_UPDATE,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody([GROUP_USER])) updateData: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    updateData.dateLeave = moment().endOf('year').diff(updateData.startDate, 'months');
    return {
      message: 'Update Success',
      data: await this.service.update(id, updateData),
    };
  }

  @Auth({
    summary: 'Delete User',
    serializeOptions: { groups: [GROUP_USER] },
    permission: P_USER_DELETE,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.service.remove(id),
    };
  }
}
