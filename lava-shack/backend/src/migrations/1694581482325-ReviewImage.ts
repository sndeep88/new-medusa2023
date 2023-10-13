import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewImage1694581482325 implements MigrationInterface {
	name = "ReviewImage1694581482325";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "review_image" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "review_id" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_953505a56c4a0c9b07726d2f09a" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_90199fd60eca06db0fa71259ca" ON "review_image" ("review_id") `
		);
		await queryRunner.query(
			`ALTER TABLE "product_review" ADD "enabled" boolean NOT NULL DEFAULT true`
		);
		await queryRunner.query(
			`ALTER TABLE "review_image" ADD CONSTRAINT "FK_90199fd60eca06db0fa71259ca8" FOREIGN KEY ("review_id") REFERENCES "product_review"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "review_image" DROP CONSTRAINT "FK_90199fd60eca06db0fa71259ca8"`
		);
		await queryRunner.query(
			`ALTER TABLE "product_review" DROP COLUMN "enabled"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_90199fd60eca06db0fa71259ca"`
		);
		await queryRunner.query(`DROP TABLE "review_image"`);
	}
}
