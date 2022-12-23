import { Like, Repository, Between } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as moment from 'moment';

import { PaginationQueryDto } from '../dto/pagination.query.dto';

export abstract class BaseService {
  public listQuery = [];
  constructor(public repo: Repository<any>) {}

  findAll(paginationQuery: PaginationQueryDto) {
    return this.repo.findAndCount(this.requestByPagination(paginationQuery, this.listQuery));
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!data) {
      throw new NotFoundException(`data  #${id} not found`);
    }
    return data;
  }

  async create(body: any) {
    const data = this.repo.create({ ...body });
    return this.repo.save(data);
  }

  async update(id: string, body: any) {
    const data = await this.repo.preload({
      id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`data  #${id} not found`);
    }
    return this.repo.save(data);
  }

  async remove(id: string) {
    const res = await this.repo.softDelete(id);
    if (!res.affected) {
      throw new NotFoundException(id);
    }
    return await this.findOne(id);
  }

  async removeHard(id: string) {
    const data = await this.findOne(id);
    const res = await this.repo.delete(id);
    if (!res.affected) {
      throw new NotFoundException(id);
    }
    return data;
  }
  requestByPagination(paginationQuery: PaginationQueryDto, listKey: string[] = []) {
    const { perPage, page, fullTextSearch } = paginationQuery;
    let { where, filter, sorts } = paginationQuery;

    if (typeof filter === 'string') filter = JSON.parse(filter);
    if (typeof sorts === 'string') sorts = JSON.parse(sorts);
    if (!where) where = [];

    if (filter && Object.keys(filter).length) {
      where.push({});
      Object.keys(filter).forEach((key) => {
        if (typeof filter[key] === 'object') {
          if (filter[key].length > 0) {
            if (moment(filter[key][0], moment.ISO_8601).isValid()) {
              where[where.length - 1][key] = Between(filter[key][0], filter[key][1]);
            }
            // else {
            //   filter[key].forEach((item) => {
            //     where[where.length - 1][key] = item;
            //   });
            // }
          }
        } else {
          where[where.length - 1][key] =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(filter[key])
              ? filter[key]
              : Like('%' + filter[key] + '%');
        }
      });
    }

    if (fullTextSearch && listKey.length) {
      where.push({});
      listKey.forEach((key) => (where[where.length - 1][key] = Like('%' + fullTextSearch + '%')));
    }
    return {
      take: perPage || 0,
      order: sorts || { createdAt: 'DESC' },
      where: where.length ? where : {},
      skip: (page !== undefined ? page - 1 : 0) * (perPage || 0),
      withDeleted: false,
      cache: 60000,
    };
  }
}
