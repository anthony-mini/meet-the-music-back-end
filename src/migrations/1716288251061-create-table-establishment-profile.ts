import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { EstablishmentType } from '../establishment-profile/enums/establishment-type.enum';

export class CreateTableEstablishmentProfile1716288251061
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'establishmentProfile',
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
            name: 'userId',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'capacity',
            type: 'int',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'website',
            type: 'varchar',
          },
          {
            name: 'zipCode',
            type: 'int',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: [
              EstablishmentType.BAR,
              EstablishmentType.RESTAURANT,
              EstablishmentType.CLUB,
              EstablishmentType.PUB,
              EstablishmentType.LOUNGE,
              EstablishmentType.CAFE,
            ],
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
        ],
      }),
      true,
    );

    // Add foreign key constraint from artistProfile to user
    await queryRunner.createForeignKey(
      'app.establishmentProfile',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'app.user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('app.establishmentProfile');
  }
}