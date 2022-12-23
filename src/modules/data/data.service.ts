import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';

import { BaseService } from '@common';
import { Data } from './data.entity';
import { CreateDataRequestDto, UpdateDataRequestDto } from '@modules/data/dto';
import { DataTranslation } from '@modules/data/translation/translation.entity';

export const P_DATA_LISTED = '1db70aa0-7541-4433-b2f6-fbd7bf8bf7bb';
export const P_DATA_CREATE = 'c3ab9e11-7ba3-4afd-b5cb-c560362a3144';
export const P_DATA_UPDATE = '99ea12da-5800-4d6d-9e73-60c016a267a9';
export const P_DATA_DELETE = '2e8c8772-2505-4683-b6fa-13fa2570eee7';

@Injectable()
export class DataService extends BaseService {
  constructor(
    @InjectRepository(Data)
    public repo: Repository<Data>,
    private readonly dataSource: DataSource,
  ) {
    super(repo);
  }

  async create(body: CreateDataRequestDto) {
    let result = null;
    await this.dataSource.transaction(async (entityManager) => {
      result = await entityManager.save(entityManager.create(Data, { ...body }));
      for (const item of body.translations) {
        const existingName = await entityManager.count(DataTranslation, {
          where: { name: item.name, language: item.language },
        });
        if (existingName) {
          throw new BadRequestException(`name is already taken`);
        }
        await entityManager.save(entityManager.create(DataTranslation, { dataId: result.id, ...item }));
      }
    });
    return result;
  }

  async update(id: string, body: UpdateDataRequestDto) {
    let result = null;
    await this.dataSource.transaction(async (entityManager) => {
      const data = await entityManager.preload(Data, {
        id,
        ...body,
      });
      if (!data) {
        throw new NotFoundException(`data  #${id} not found`);
      }
      result = await this.repo.save(data);
      for (const item of body.translations) {
        const existingName = await entityManager.count(DataTranslation, {
          where: { name: item.name, language: item.language, dataId: Not(id) },
        });
        if (existingName) {
          throw new BadRequestException(`name is already taken`);
        }
        await entityManager.save(await entityManager.preload(DataTranslation, { dataId: result.id, ...item }));
      }
    });
    return result;
  }
}
