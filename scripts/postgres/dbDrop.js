// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  database: 'meet-the-music',
});

const query = `
DROP SCHEMA IF EXISTS app CASCADE;`;

client.connect();

client.query(query, (err, res) => {
  console.log(err, res);
  client.end();
});
