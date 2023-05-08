import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1683557119909 implements MigrationInterface {
    name = 'Script1683557119909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "trading_stat" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "data_date" TIMESTAMP WITH TIME ZONE,
                "financial_date" TIMESTAMP WITH TIME ZONE,
                "year" smallint NOT NULL,
                "open" numeric,
                "high" numeric,
                "low" numeric,
                "close" numeric,
                "par" numeric,
                "pe" numeric,
                "pbv" numeric,
                "total_value" numeric,
                "total_volume" numeric,
                "dividend_payout_ratio" numeric,
                "symbol_id" bigint NOT NULL,
                CONSTRAINT "PK_e198c669a529ebd1170f97e47ae" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "financial_ratio" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "begin_at" TIMESTAMP WITH TIME ZONE,
                "end_at" TIMESTAMP WITH TIME ZONE,
                "year" smallint NOT NULL,
                "account_name" text,
                "value" numeric,
                "symbol_id" bigint NOT NULL,
                CONSTRAINT "PK_0da4a888d8545d99c2d5a90946d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "trading_stat"
            ADD CONSTRAINT "FK_eaa88763a9a9a16f7a26caeac16" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "financial_ratio"
            ADD CONSTRAINT "FK_88b85bb37865c19c5a54f2aa357" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "financial_ratio" DROP CONSTRAINT "FK_88b85bb37865c19c5a54f2aa357"
        `);
        await queryRunner.query(`
            ALTER TABLE "trading_stat" DROP CONSTRAINT "FK_eaa88763a9a9a16f7a26caeac16"
        `);
        await queryRunner.query(`
            DROP TABLE "financial_ratio"
        `);
        await queryRunner.query(`
            DROP TABLE "trading_stat"
        `);
    }

}
