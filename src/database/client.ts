import { Client } from 'pg';

const client = new Client({
    user: 'mahmoudelawadi',
    password: 'iamvagner86',
    host: 'localhost',
    port: 5432,
    database: 'football_db'
});

export default client;