import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

function getSSLConfig() {
  const env = process.env.NODE_ENV;
  let rejectUnauthorized = false;

  if (env === 'staging' || env === 'production') {
    rejectUnauthorized = true;
  }

  return {
    rejectUnauthorized,
    ca: process.env.CA_CERT,
  };
}

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA_DEFAULT,
  ssl: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: false, // Disable auto-run migrations
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
