import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewScores1694534573899 implements MigrationInterface {
	name = "ReviewScores1694534573899";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "review_score" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" character varying, "score" double precision NOT NULL, CONSTRAINT "PK_557b5edec6f7cb71312d51e8c69" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7b1fa19e7949a5438937e08cc0" ON "review_score" ("product_id") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_7b1fa19e7949a5438937e08cc0"`
		);
		await queryRunner.query(`DROP TABLE "review_score"`);
	}
}
