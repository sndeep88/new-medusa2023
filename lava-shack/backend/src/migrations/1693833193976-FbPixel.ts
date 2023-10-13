import { MigrationInterface, QueryRunner } from "typeorm";

export class FbPixel1693833193976 implements MigrationInterface {
	name = "FbPixel1693833193976";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "fb_pixel" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pixel_id" character varying NOT NULL, "enabled" boolean NOT NULL, CONSTRAINT "UQ_cbb6df042b0f71a56a1c6ca3207" UNIQUE ("pixel_id"), CONSTRAINT "PK_f65897ab206e2c160fb4efbb0cc" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_cbb6df042b0f71a56a1c6ca320" ON "fb_pixel" ("pixel_id") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {    
		await queryRunner.query(
			`DROP INDEX "public"."IDX_cbb6df042b0f71a56a1c6ca320"`
		);
		await queryRunner.query(`DROP TABLE "fb_pixel"`);
	}
}
