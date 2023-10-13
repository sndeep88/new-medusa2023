import { MigrationInterface, QueryRunner } from "typeorm";

export class PageManage1693883069055 implements MigrationInterface {
	name = "PageManage1693883069055";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."page_status_enum" AS ENUM('publish', 'unpublish')`
		);
		await queryRunner.query(
			`CREATE TABLE "page" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "status" "public"."page_status_enum" NOT NULL DEFAULT 'publish', "content" text NOT NULL, "tag_id" character varying NOT NULL, "tagId" character varying, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a360e7d23ef159966c7ccc708f" ON "page" ("tag_id") `
		);
		await queryRunner.query(
			`CREATE TABLE "page_tag" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_a360e7d23ef159966c7ccc708f9" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_b2aa94516cee9dd1ebfa7da37e" ON "page_tag" ("code") `
		);
		await queryRunner.query(
			`ALTER TABLE "page" ADD CONSTRAINT "FK_2c219c9307e74313b38ffe002c5" FOREIGN KEY ("tagId") REFERENCES "page_tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`INSERT INTO "page_tag" ("id", "created_at", "updated_at", "name", "code") VALUES ('1', now(), now(), 'Site Info', 'site-info')`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "page" DROP CONSTRAINT "FK_2c219c9307e74313b38ffe002c5"`
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b2aa94516cee9dd1ebfa7da37e"`
		);
		await queryRunner.query(`DROP TABLE "page_tag"`);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_a360e7d23ef159966c7ccc708f"`
		);
		await queryRunner.query(`DROP TABLE "page"`);
		await queryRunner.query(`DROP TYPE "public"."page_status_enum"`);
	}
}
