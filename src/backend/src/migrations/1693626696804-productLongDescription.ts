import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductLongDescription1693626696804 implements MigrationInterface {
	name = "ProductLongDescription1693626696804";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "product_description" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" text NOT NULL, "product_id" character varying NOT NULL, CONSTRAINT "PK_ced8671d69966133eeb83d4df0b" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "product_description"`);
	}
}
