import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1642359711520 implements MigrationInterface {
  name = 'migration1642359711520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orm_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_3370265807994282fbd14097593" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orm_task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "columnId" uuid, "boardId" uuid, "userIdId" uuid, CONSTRAINT "PK_a51ba6800205033ec69765fcccb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orm_board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columns" json, CONSTRAINT "PK_e2d810b36e59df1542e0c22ea87" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orm_column" ("columnId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_bcfaeb40bdf99a9d2fab4c3711b" PRIMARY KEY ("columnId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "orm_task" ADD CONSTRAINT "FK_e4818f5c57b066859991875c588" FOREIGN KEY ("userIdId") REFERENCES "orm_user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orm_column" ADD CONSTRAINT "FK_e41debc17b0db837119bbccf976" FOREIGN KEY ("boardId") REFERENCES "orm_board"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orm_column" DROP CONSTRAINT "FK_e41debc17b0db837119bbccf976"`
    );
    await queryRunner.query(
      `ALTER TABLE "orm_task" DROP CONSTRAINT "FK_e4818f5c57b066859991875c588"`
    );
    await queryRunner.query(`DROP TABLE "orm_column"`);
    await queryRunner.query(`DROP TABLE "orm_board"`);
    await queryRunner.query(`DROP TABLE "orm_task"`);
    await queryRunner.query(`DROP TABLE "orm_user"`);
  }
}
