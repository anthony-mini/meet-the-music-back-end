import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'mypassword',
  database: 'meet-the-music',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: false, // Disable auto-run migrations
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  schema: 'public', // Default schema to use for migrations
  migrationsTableName: 'migrations',
});
