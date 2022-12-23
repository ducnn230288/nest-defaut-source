import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '@common';
import {
  UserRoleResponseDto,
  ListUserRoleResponseDto,
  CreateUserRoleRequestDto,
  UpdateUserRoleRequestDto,
  PermissionResponseDto,
} from './dto';

import { P_AUTH_DELETE_IMAGE_TEMP } from '@auth/auth.service';
import {
  P_CODE_TYPE_LISTED,
  P_CODE_TYPE_DETAIL,
  P_CODE_TYPE_CREATE,
  P_CODE_TYPE_UPDATE,
  P_CODE_TYPE_DELETE,
} from '@modules/code/type/type.service';
import { P_CODE_LISTED, P_CODE_DETAIL, P_CODE_CREATE, P_CODE_UPDATE, P_CODE_DELETE } from '@modules/code/code.service';
import {
  UserRoleService,
  P_USER_ROLE_LISTED,
  P_USER_ROLE_DETAIL,
  P_USER_ROLE_CREATE,
  P_USER_ROLE_UPDATE,
  P_USER_ROLE_DELETE,
} from '@modules/user/role/role.service';
import { P_USER_CREATE, P_USER_DELETE, P_USER_DETAIL, P_USER_LISTED, P_USER_UPDATE } from '@modules/user/user.service';

import {
  P_DATA_TYPE_LISTED,
  P_DATA_TYPE_CREATE,
  P_DATA_TYPE_UPDATE,
  P_DATA_TYPE_DELETE,
} from '@modules/data/type/type.service';
import { P_DATA_LISTED, P_DATA_CREATE, P_DATA_UPDATE, P_DATA_DELETE } from '@modules/data/data.service';
import { P_PAGE_LISTED, P_PAGE_CREATE, P_PAGE_UPDATE, P_PAGE_DELETE } from '@modules/page/page.service';

@Headers('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_USER_ROLE_LISTED,
  })
  @Get()
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListUserRoleResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_USER_ROLE_CREATE,
  })
  @Post()
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateUserRoleRequestDto,
  ): Promise<UserRoleResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_USER_ROLE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateUserRoleRequestDto, //
  ): Promise<UserRoleResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_USER_ROLE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<UserRoleResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }

  @Auth({
    summary: 'Get list permission',
    permission: P_USER_ROLE_LISTED,
  })
  @Get('/permission')
  async findAllPermission(@I18n() i18n: I18nContext): Promise<PermissionResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: [
        P_AUTH_DELETE_IMAGE_TEMP,

        P_CODE_TYPE_LISTED,
        P_CODE_TYPE_DETAIL,
        P_CODE_TYPE_CREATE,
        P_CODE_TYPE_UPDATE,
        P_CODE_TYPE_DELETE,

        P_CODE_LISTED,
        P_CODE_DETAIL,
        P_CODE_CREATE,
        P_CODE_UPDATE,
        P_CODE_DELETE,

        P_USER_ROLE_LISTED,
        P_USER_ROLE_DETAIL,
        P_USER_ROLE_CREATE,
        P_USER_ROLE_UPDATE,
        P_USER_ROLE_DELETE,

        P_USER_LISTED,
        P_USER_DETAIL,
        P_USER_CREATE,
        P_USER_UPDATE,
        P_USER_DELETE,

        P_DATA_TYPE_LISTED,
        P_DATA_TYPE_CREATE,
        P_DATA_TYPE_UPDATE,
        P_DATA_TYPE_DELETE,

        P_DATA_LISTED,
        P_DATA_CREATE,
        P_DATA_UPDATE,
        P_DATA_DELETE,

        P_PAGE_LISTED,
        P_PAGE_CREATE,
        P_PAGE_UPDATE,
        P_PAGE_DELETE,
      ],
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_USER_ROLE_DETAIL,
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<UserRoleResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id),
    };
  }
}
