import { MigrationInterface, QueryRunner } from "typeorm";

export class SystemConfigType1697085262540 implements MigrationInterface {
    name = 'SystemConfigType1697085262540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."system_config_type_enum" RENAME TO "system_config_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."system_config_type_enum" AS ENUM('payment', 'email', 'sms', 'google-api', 'tracking')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" TYPE "public"."system_config_type_enum" USING "type"::"text"::"public"."system_config_type_enum"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" SET DEFAULT 'payment'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."system_config_provider_enum" RENAME TO "system_config_provider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."system_config_provider_enum" AS ENUM('mpay', 'stripe', 'square', 'mailgun', 'textgrid', 'google', 'medusa', 'dummy')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" TYPE "public"."system_config_provider_enum" USING "provider"::"text"::"public"."system_config_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" SET DEFAULT 'medusa'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_provider_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."system_config_provider_enum_old" AS ENUM('mpay', 'stripe', 'square', 'mailgun', 'textgrid', 'google', 'medusa')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" TYPE "public"."system_config_provider_enum_old" USING "provider"::"text"::"public"."system_config_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "provider" SET DEFAULT 'medusa'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."system_config_provider_enum_old" RENAME TO "system_config_provider_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."system_config_type_enum_old" AS ENUM('payment', 'email', 'sms', 'google-api')`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" TYPE "public"."system_config_type_enum_old" USING "type"::"text"::"public"."system_config_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "system_config" ALTER COLUMN "type" SET DEFAULT 'payment'`);
        await queryRunner.query(`DROP TYPE "public"."system_config_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."system_config_type_enum_old" RENAME TO "system_config_type_enum"`);
    }

}
