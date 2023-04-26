import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1682475993872 implements MigrationInterface {
    name = 'Script1682475993872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."set_api_raw_data_type_enum" AS ENUM(
                'unknown',
                'set-stock-list-v1',
                'set-stock-symbol-related-product-o-v1',
                'set-stock-symbol-related-product-w-v1',
                'set-stock-symbol-index-list-v1',
                'set-stock-symbol-company-highlight-financial-data-v1',
                'set-stock-symbol-profile-v1',
                'set-company-symbol-profile-v1'
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
