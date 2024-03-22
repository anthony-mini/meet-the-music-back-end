import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA_DEFAULT, // Default schema to use for migrations
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: false, // Disable auto-run migrations
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
