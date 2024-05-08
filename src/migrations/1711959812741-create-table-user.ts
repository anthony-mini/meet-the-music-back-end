import { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm/schema-builder/table/Table';
import { Role } from '../users/enums/role.enum';
import { Status } from '../users/enums/status.enum';

export class CreateTableUser1711959812741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        schema: 'app',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'role',
            type: 'enum',
            enum: [Role.ADMIN, Role.ARTIST, Role.PROMOTER, Role.USER],
            default: `'${Role.USER}'`,
          },
          {
            name: 'status',
            type: 'enum',
            enum: [Status.ACTIVE, Status.INACTIVE, Status.SUSPENDED],
            default: `'${Status.ACTIVE}'`,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('app.user', true);
  }
}
