import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSocialMediaTable1716234116511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'socialMedia',
        schema: 'app',
        columns: [
          {
            name: 'artistProfileId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'socialMediaName',
            type: 'enum',
            enum: [
              'INSTAGRAM',
              'FACEBOOK',
              'TWITTER',
              'YOUTUBE',
              'LINKEDIN',
              'TIKTOK',
              'SNAPCHAT',
              'WHATSAPP',
              'DISCORD',
              'SPOTIFY',
              'SOUNDCLOUD',
            ],
            isPrimary: true,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: true,
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Add foreign key constraint from socialMedia to artistProfile
    await queryRunner.createForeignKey(
      'app.socialMedia',
      new TableForeignKey({
        columnNames: ['artistProfileId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'app.artistProfile',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('app.socialMedia', true);
  }
}
