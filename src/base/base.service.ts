import { ClassConstructor } from 'class-transformer';
import { DeepPartial, In, Not, Repository } from 'typeorm';
import { Base } from './base.entity';

export type M2MRelationshipsInfo = {
  [key: string]: {
    class: ClassConstructor<Base>;
    service: BaseService<any>;
    srcIdColName: string;
    relIdColName: string;
  };
};

export abstract class BaseService<T extends Base> {
  protected m2mRelationships: M2MRelationshipsInfo = {};
  protected nameof = <T>(name: Extract<keyof T, string>): string => name;

  constructor(public repo: Repository<Base>) {}

  async findOne(id: string): Promise<Base> {
    return await this.repo.findOne({ where: { id } });
  }

  async create(createResourceInputs: any[]): Promise<Base[]> {
    const resources: Base[] = [];
    for (const resourceInput of createResourceInputs) {
      let resource = this.setNonRelationshipFields(resourceInput, this.repo.create());
      resource = await this.repo.save(resource as any as DeepPartial<T>);
      // Save first, then add relationships, otherwise their source id is undefined.
      resourceInput.id = resource.id;

      resources.push(await this.resolveM2MRelationships(resource, resourceInput));
    }
    return this.repo.save(resources as any as DeepPartial<T>[]);
  }

  private setNonRelationshipFields(resourceInput: any, resource: Base): Base {
    for (const propertyName in resourceInput) {
      if (!Object.prototype.hasOwnProperty.call(resourceInput, propertyName)) continue;

      const property = resourceInput[propertyName];
      if (Object.keys(this.m2mRelationships).find((relationName) => relationName === propertyName)) continue;

      resource[propertyName] = property;
    }
    return resource;
  }

  private async resolveM2MRelationships(resource: Base, updateInputData: any) {
    for (const relPropName in this.m2mRelationships) {
      if (!Object.prototype.hasOwnProperty.call(this.m2mRelationships, relPropName)) continue;
      if (!updateInputData[relPropName]) continue;

      const relInfo = this.m2mRelationships[relPropName];
      await BaseService.removeRelatedItems(
        relInfo,
        updateInputData.id,
        updateInputData[relPropName].map((relatedResource) => relatedResource[relInfo.relIdColName]),
      );
      resource[relPropName] = await this.saveRelatedItems(
        updateInputData[relPropName].map((relatedResource) => {
          relatedResource[relInfo.srcIdColName] = updateInputData.id;
          return relatedResource;
        }),
        relInfo,
      );
    }
    return resource;
  }

  private static async removeRelatedItems(relInfo: M2MRelationshipsInfo[''], sourceId: number, relatedIds: number[]) {
    // https://github.com/typeorm/typeorm/issues/2121
    const findManyOptions = {};
    findManyOptions[relInfo.srcIdColName] = sourceId;
    findManyOptions[relInfo.relIdColName] = Not(In(relatedIds));
    const relatedItemsToRemove = await relInfo.service.repo.find(findManyOptions);
    await relInfo.service.repo.remove(relatedItemsToRemove);
  }

  private async saveRelatedItems(updateInputRelatedData: any[], relInfo: M2MRelationshipsInfo['']) {
    return Promise.resolve(
      updateInputRelatedData.map((relatedItem) => {
        // https://github.com/typeorm/typeorm/issues/7038
        relatedItem['id'] = relatedItem['id'] ?? undefined;
        relatedItem[relInfo.srcIdColName] = relatedItem[relInfo.srcIdColName] ?? undefined;
        relatedItem[relInfo.relIdColName] = relatedItem[relInfo.relIdColName] ?? undefined;
        return relatedItem;
      }) as any,
    );
  }
}
