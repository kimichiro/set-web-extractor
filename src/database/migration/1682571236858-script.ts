import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1682571236858 implements MigrationInterface {
    name = 'Script1682571236858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."set_api_raw_data_type_enum" AS ENUM(
                'unknown',
                'set-stock-list-v1',
                'set-stock-symbol-overview-v1',
                'set-stock-symbol-related-product-o-v1',
                'set-stock-symbol-related-product-w-v1',
                'set-stock-symbol-index-list-v1',
                'set-stock-symbol-company-highlight-financial-data-v1',
                'set-stock-symbol-profile-v1',
                'set-stock-symbol-corporate-action-historical-v1',
                'set-stock-symbol-chart-quotation-v1',
                'set-stock-symbol-chart-performance-v1',
                'set-stock-symbol-historical-trading-v1',
                'set-news-symbol-list-v1',
                'set-company-symbol-profile-v1',
                'set-index-list-v1',
                'set-index-symbol-chart-performance-v1',
                'set-factsheet-symbol-price-performance-v1',
                'set-factsheet-symbol-profile-v1',
                'set-factsheet-symbol-trading-stat-v1',
                'set-factsheet-symbol-financial-statement-balance-sheet-v1',
                'set-factsheet-symbol-financial-statement-income-statement-v1',
                'set-factsheet-symbol-financial-statement-cash-flow-v1',
                'set-factsheet-symbol-financial-ratio-v1',
                'set-factsheet-symbol-financial-growth-v1',
                'set-factsheet-symbol-capital-movement-v1',
                'set-factsheet-symbol-trading-sign-v1',
                'set-factsheet-symbol-market-alert-v1'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "set_api_raw_data" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "type" "public"."set_api_raw_data_type_enum" NOT NULL DEFAULT 'unknown',
                "url" text NOT NULL,
                "data" jsonb NOT NULL,
                "is_extracted" boolean NOT NULL,
                CONSTRAINT "PK_3dd59e6848f34d825401d5d750d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "set_api_raw_data"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."set_api_raw_data_type_enum"
        `);
    }

}
