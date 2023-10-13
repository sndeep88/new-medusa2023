import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackingType1697011120493 implements MigrationInterface {
    name = 'TrackingType1697011120493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."fb_pixel_type_enum" AS ENUM('facebook', 'google', 'tiktok')`);
        await queryRunner.query(`ALTER TABLE "fb_pixel" ADD "type" "public"."fb_pixel_type_enum" NOT NULL DEFAULT 'facebook'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fb_pixel" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."fb_pixel_type_enum"`);
    }

}
