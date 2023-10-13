import { MigrationInterface, QueryRunner } from "typeorm";

export class Template1693974536251 implements MigrationInterface {
	name = "Template1693974536251";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."template_type_enum" AS ENUM('email', 'sms')`
		);
		await queryRunner.query(
			`CREATE TABLE "template" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "subject" character varying NOT NULL, "template" text NOT NULL, "type" "public"."template_type_enum" NOT NULL DEFAULT 'email', CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`
		);

		// create default items
		await queryRunner.query(
			`INSERT INTO "template" ("id", "title", "description", "subject", "template", "type") 
            VALUES 
                ('etem_1', 'Confirm Order', 'Send when order is confirm', '[Shopping Center] Order confirmed', '<p>Your order is confirmed</p>', 'email'), 
                ('etem_2', 'Remind Order', 'Send after 5mins enter checkout pate without purchase.', '[Shopping Center] ', '<p>Your order is not purchase</p>', 'email'), 
                ('etem_3', 'Sign Up', 'Send when user signup', '[Shopping Center] You register an account', '<p>Your accoutn is ready</p>', 'email'), 
                ('etem_4', 'Invitation', 'Send when an invitation is sent', '[Shopping Center] Invitation', '<p>You recept an invite to join</p>', 'email'), 
                ('etem_5', 'Confirm Order', 'Send when order is confirm', '[Shopping Center] Order confirmed', '<p>Your order is confirmed</p>', 'sms'), 
                ('etem_6', 'Remind Order', 'Send after 5mins enter checkout pate without purchase.', '[Shopping Center] ', '<p>Your order is not purchase</p>', 'sms'), 
                ('etem_7', 'Sign Up', 'Send when user signup', '[Shopping Center] You register an account', '<p>Your accoutn is ready</p>', 'sms'), 
                ('etem_8', 'Invitation', 'Send when an invitation is sent', '[Shopping Center] Invitation', '<p>You recept an invite to join</p>', 'sms')
            `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "template"`);
		await queryRunner.query(`DROP TYPE "public"."template_type_enum"`);
	}
}
