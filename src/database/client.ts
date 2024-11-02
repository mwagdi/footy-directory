import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' ? { ssl: { rejectUnauthorized: false } } : {}),
});

export default client;