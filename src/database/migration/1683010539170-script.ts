import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1683010539170 implements MigrationInterface {
    name = 'Script1683010539170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "symbol" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "symbol" text NOT NULL,
                "security_type" text NOT NULL,
                "name_th" text NOT NULL,
                "name_en" text NOT NULL,
                "market" text NOT NULL,
                "industry" text NOT NULL,
                "sector" text NOT NULL,
                "indices" jsonb,
                CONSTRAINT "UQ_6ff45711b8039a68a3f43dcb7a8" UNIQUE ("symbol"),
                CONSTRAINT "PK_d1373cd631624b100a81a545dee" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "symbol"
        `);
    }

}
