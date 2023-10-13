import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableTemplate1694083384939 implements MigrationInterface {
    name = 'EnableTemplate1694083384939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ADD "enable" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "template" ADD "code" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_9e7d1605c892378854eb44a154" ON "template" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9e7d1605c892378854eb44a154"`);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "enable"`);
    }

}
