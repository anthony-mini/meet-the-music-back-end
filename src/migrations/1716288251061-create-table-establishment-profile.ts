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
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'website',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zipCode',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            isNullable: true,
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
