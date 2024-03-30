import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1711118803620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE app."table" (
                        "id" SERIAL PRIMARY KEY,
                        "name" VARCHAR(255) NOT NULL,
                        "description" TEXT NOT NULL,
                        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
                )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE app."table"`);
  }
}
