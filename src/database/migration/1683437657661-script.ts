import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1683437657661 implements MigrationInterface {
    name = 'Script1683437657661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "symbol" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "market" text NOT NULL,
                "symbol" text NOT NULL,
                "security_type" text,
                "name_th" text,
                "name_en" text,
                "industry" text,
                "sector" text,
                "indices" jsonb,
                "related_products" jsonb,
                CONSTRAINT "UQ_ffe436e1120c1fd86ef22310c83" UNIQUE ("market", "symbol"),
                CONSTRAINT "PK_d1373cd631624b100a81a545dee" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "financial_statement" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "begin_at" TIMESTAMP WITH TIME ZONE,
                "end_at" TIMESTAMP WITH TIME ZONE,
                "year" smallint NOT NULL,
                "status" text,
                "account_code" text NOT NULL,
                "account_name" text,
                "is_adjusted" boolean,
                "amount" numeric,
                "divider" integer,
                "format" text,
                "level" integer,
                "symbol_id" bigint NOT NULL,
                CONSTRAINT "PK_4e795d12a43006ece4788e13371" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "financial_statement"
            ADD CONSTRAINT "FK_4d7d4313470297699ce6a63b558" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "financial_statement" DROP CONSTRAINT "FK_4d7d4313470297699ce6a63b558"
        `);
        await queryRunner.query(`
            DROP TABLE "financial_statement"
        `);
        await queryRunner.query(`
            DROP TABLE "symbol"
        `);
    }

}
