import client from './client';
import { CLUBS_TABLE_QUERY, NATIONS_TABLE_QUERY, PLAYER_NATIONS_TABLE_QUERY, PLAYERS_TABLE_QUERY } from './sql';

export const createTables = async () => {
  try {
    await client.connect();
    console.log('Connected successfully');

    await client.query(NATIONS_TABLE_QUERY);
    console.log('Nations table created successfully');

    await client.query(CLUBS_TABLE_QUERY);
    console.log('Clubs table created successfully');

    await client.query(PLAYERS_TABLE_QUERY);
    console.log('Players table created successfully');

    await client.query(PLAYER_NATIONS_TABLE_QUERY);
    console.log('Player Nations junction table created successfully');
  } catch (error) {
    console.log(error);
  }
};