import { MigrationInterface, QueryRunner } from "typeorm";

export class SystemConfig1694057016428 implements MigrationInterface {
    name = 'SystemConfig1694057016428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."system_config_type_enum" AS ENUM('payment', 'email', 'sms', 'google-api')`);
        await queryRunner.query(`CREATE TYPE "public"."system_config_provider_enum" AS ENUM('mpay', 'mailgun', 'textgrid', 'google', 'medusa')`);
        await queryRunner.query(`CREATE TABLE "system_config" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."system_config_type_enum" NOT NULL DEFAULT 'payment', "provider" "public"."system_config_provider_enum" NOT NULL DEFAULT 'medusa', "key" character varying NOT NULL, "key_name" character varying NOT NULL, "key_description" character varying NOT NULL, "value" character varying NOT NULL, "required" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_db4e70ac0d27e588176e9bb44a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eedd3cd0f227c7fb5eff2204e9" ON "system_config" ("key") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_eedd3cd0f227c7fb5eff2204e9"`);
        await queryRunner.query(`DROP TABLE "system_config"`);
        await queryRunner.query(`DROP TYPE "public"."system_config_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."system_config_type_enum"`);
    }

}
