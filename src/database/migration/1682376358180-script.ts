import { MigrationInterface, QueryRunner } from "typeorm";

export class Script1682376358180 implements MigrationInterface {
    name = 'Script1682376358180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" BIGSERIAL NOT NULL,
                "repository_access_token" text,
                "release_candidate_number" integer NOT NULL DEFAULT '1',
                "release_candidate_number2" integer NOT NULL DEFAULT '2',
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "project"
        `);
    }

}
