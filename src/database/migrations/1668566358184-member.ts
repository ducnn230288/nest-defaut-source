import { MigrationInterface, QueryRunner } from 'typeorm';

export class member1669372347132 implements MigrationInterface {
  name = 'member1669372347132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "subName" character varying, "image" character varying, "order" integer, "description" character varying, "content" jsonb NOT NULL DEFAULT '{}', "attribute" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_652a15c02538138f021f1320de8" UNIQUE ("code"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_902b2b4003467150048c5ebce03" UNIQUE ("code"), CONSTRAINT "PK_6c2bdfaadc414f95ca862fa5e0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "isSystemAdmin" boolean NOT NULL DEFAULT false, "permissions" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "avatar" character varying, "password" character varying NOT NULL, "refreshToken" character varying, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "description" character varying, "roleId" uuid, "positionCode" character varying, "startDate" TIMESTAMP NOT NULL, "dateLeave" real, "dateOff" real DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "isHomePage" boolean NOT NULL DEFAULT false, "content" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_63ad76a14a8321d22dc0a5e7041" FOREIGN KEY ("type") REFERENCES "category_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_22188999bf0339b3fb2ff462aeb" FOREIGN KEY ("positionCode") REFERENCES "category"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_22188999bf0339b3fb2ff462aeb"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
    await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_63ad76a14a8321d22dc0a5e7041"`);
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "category_type"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
