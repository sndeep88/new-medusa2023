import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewAmount1694622932391 implements MigrationInterface {
	name = "ReviewAmount1694622932391";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "review_score" ADD "amount" integer NOT NULL DEFAULT '0'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "review_score" DROP COLUMN "amount"`);
	}
}
