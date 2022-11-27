import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '../../../common';
import {
  UserRoleResponseDto,
  ListUserRoleResponseDto,
  CreateUserRoleRequestDto,
  UpdateUserRoleRequestDto,
  PermissionResponseDto,
} from './dto';
import {
  UserRoleService,
  P_USER_ROLE_LISTED,
  P_USER_ROLE_DETAIL,
  P_USER_ROLE_CREATE,
  P_USER_ROLE_UPDATE,
  P_USER_ROLE_DELETE,
} from './role.service';

import { GROUP_ALL_USER_ROLE, GROUP_USER_ROLE } from './role.entity';

import {
  P_CATEGORY_TYPE_LISTED,
  P_CATEGORY_TYPE_DETAIL,
  P_CATEGORY_TYPE_CREATE,
  P_CATEGORY_TYPE_UPDATE,
  P_CATEGORY_TYPE_DELETE,
} from '../../category/type/type.service';
import {
  P_CATEGORY_LISTED,
  P_CATEGORY_DETAIL,
  P_CATEGORY_CREATE,
  P_CATEGORY_UPDATE,
  P_CATEGORY_DELETE,
} from '../../category/category.service';
import { P_USER_CREATE, P_USER_DELETE, P_USER_DETAIL, P_USER_LISTED, P_USER_UPDATE } from '../user.service';
import { P_PAGE_LISTED, P_PAGE_DETAIL, P_PAGE_CREATE, P_PAGE_UPDATE, P_PAGE_DELETE } from '../../page/page.service';

@Headers('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [GROUP_USER_ROLE] },
    permission: P_USER_ROLE_LISTED,
  })
  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListUserRoleResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: 'Get List success',
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Create data',
    serializeOptions: { groups: [GROUP_ALL_USER_ROLE] },
    permission: P_USER_ROLE_CREATE,
  })
  @Post()
  async create(
    @Body(new SerializerBody([GROUP_ALL_USER_ROLE])) body: CreateUserRoleRequestDto,
  ): Promise<UserRoleResponseDto> {
    return {
      message: 'create Success',
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    serializeOptions: { groups: [GROUP_ALL_USER_ROLE] },
    permission: P_USER_ROLE_UPDATE,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody([GROUP_ALL_USER_ROLE])) body: UpdateUserRoleRequestDto, //
  ): Promise<UserRoleResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    serializeOptions: { groups: [GROUP_USER_ROLE] },
    permission: P_USER_ROLE_DELETE,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserRoleResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.service.remove(id),
    };
  }

  @Auth({
    summary: 'Get list permission',
    serializeOptions: { groups: [GROUP_ALL_USER_ROLE] },
    permission: P_USER_ROLE_LISTED,
  })
  @Get('/permission')
  async findAllPermission(): Promise<PermissionResponseDto> {
    return {
      message: 'Update Success',
      data: [
        P_CATEGORY_TYPE_LISTED,
        P_CATEGORY_TYPE_DETAIL,
        P_CATEGORY_TYPE_CREATE,
        P_CATEGORY_TYPE_UPDATE,
        P_CATEGORY_TYPE_DELETE,

        P_CATEGORY_LISTED,
        P_CATEGORY_DETAIL,
        P_CATEGORY_CREATE,
        P_CATEGORY_UPDATE,
        P_CATEGORY_DELETE,

        P_PAGE_LISTED,
        P_PAGE_DETAIL,
        P_PAGE_CREATE,
        P_PAGE_UPDATE,
        P_PAGE_DELETE,

        P_USER_LISTED,
        P_USER_DETAIL,
        P_USER_CREATE,
        P_USER_UPDATE,
        P_USER_DELETE,

        P_USER_ROLE_LISTED,
        P_USER_ROLE_DETAIL,
        P_USER_ROLE_CREATE,
        P_USER_ROLE_UPDATE,
        P_USER_ROLE_DELETE,
      ],
    };
  }

  @Auth({
    summary: 'Get Detail data',
    serializeOptions: { groups: [GROUP_ALL_USER_ROLE] },
    permission: P_USER_ROLE_DETAIL,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserRoleResponseDto> {
    return {
      message: 'Update Success',
      data: await this.service.findOne(id),
    };
  }
}
