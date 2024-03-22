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
  migrationsRun: true,
  migrations: [__dirname + 'scripts/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
