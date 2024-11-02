import { Client } from 'pg';

console.log(process.env.NODE_ENV);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default client;