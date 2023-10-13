import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreUrl1694147291480 implements MigrationInterface {
    name = 'StoreUrl1694147291480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extend_store" ADD "storeUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extend_store" DROP COLUMN "storeUrl"`);
    }

}
