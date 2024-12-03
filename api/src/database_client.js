import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Check required DB_CLIENT environment variable
console.log('DB_CLIENT:', process.env.DB_CLIENT);

if (!process.env.DB_CLIENT) {
  throw new Error('Missing required DB_CLIENT environment variable.');
}

const connection = knex({
  client: process.env.DB_CLIENT, // 'pg' for PostgreSQL
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    ssl: {
      rejectUnauthorized: false, // This is necessary for Render and self-signed certificates
    },
  },
});

export default connection;
