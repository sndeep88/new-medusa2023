import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreImage1693819397184 implements MigrationInterface {
    name = 'StoreImage1693819397184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "extend_store" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "store_id" character varying NOT NULL, "bannerImage" character varying, "siteIcon" character varying, CONSTRAINT "PK_b896f287c0227210ac628fbb254" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f725ecf603a725a65a87dbf804" ON "extend_store" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f725ecf603a725a65a87dbf804"`);
        await queryRunner.query(`DROP TABLE "extend_store"`);
    }

}
