const { Client } = require('pg');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

client.connect();

/**
 * Create Tables
 */
const createTables = () => {  
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  client.query(queryText)
    .then((res) => {
      console.log(res);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
}

client.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  client,
  createTables,
  dropTables
};

require('make-runnable');