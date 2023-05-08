import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1683561637147 implements MigrationInterface {
    name = 'Script1683561637147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "report_basic_info" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "market" text NOT NULL,
                "symbol" text NOT NULL,
                "industry" text,
                "sector" text,
                "indices" jsonb,
                "year" smallint NOT NULL,
                "total_assets" numeric,
                "total_liabilities" numeric,
                "share_holder_equities" numeric,
                "total_revenues" numeric,
                "net_profits" numeric,
                "return_on_equity" numeric,
                "net_profit_margin" numeric,
                "price_to_earning" numeric,
                "price_to_booking_value" numeric,
                CONSTRAINT "UQ_e496e05953c3951b9d5c1b66162" UNIQUE ("market", "symbol", "year"),
                CONSTRAINT "PK_84b4a9389350fc8cdc70f1de7b7" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "report_basic_info"
        `);
    }

}
