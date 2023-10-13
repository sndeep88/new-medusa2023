import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultTemplate1694006258624 implements MigrationInterface {
    name = 'DefaultTemplate1694006258624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ADD "default_template" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "default_template"`);
    }

}
