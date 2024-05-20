/* eslint-disable */
require('dotenv').config();
const { Client } = require('pg');

const getSSLConfig = () => {
  const env = process.env.NODE_ENV;
  let rejectUnauthorized = false;

  if (env === 'staging' || env === 'production') {
    rejectUnauthorized = true;
  }

  return {
    rejectUnauthorized,
    ca: process.env.CA_CERT,
  };
};

const client = new Client({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: getSSLConfig(),
});

const query = `
DROP SCHEMA IF EXISTS app CASCADE;`;

client.connect();

client.query(query, (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Query result:', res);
  }
  client.end();
});
