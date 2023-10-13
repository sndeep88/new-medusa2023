import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProvider1694343023333 implements MigrationInterface {
    name = 'AddProvider1694343023333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."system_config_provider_enum" RENAME TO "system_config_provider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."system_config_provider_enum" AS ENUM('mpay', 'stripe', 'mailgun', 'textgrid', 'google', 'medusa')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" TYPE "public"."system_config_provider_enum" USING "provider"::"text"::"public"."system_config_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" SET DEFAULT 'medusa'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_provider_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."system_config_provider_enum_old" AS ENUM('mpay', 'mailgun', 'textgrid', 'google', 'medusa')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" TYPE "public"."system_config_provider_enum_old" USING "provider"::"text"::"public"."system_config_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" SET DEFAULT 'medusa'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."system_config_provider_enum_old" RENAME TO "system_config_provider_enum"`);
    }

}
