/* eslint-disable */
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const query = `
DROP SCHEMA IF EXISTS app CASCADE;`;

client.connect();

client.query(query, (err, res) => {
  console.log(err, res);
  client.end();
});
