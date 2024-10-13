import client from './client';
import { QueryResult } from 'pg';

interface IQuery {
  key: string,
  text: string,
  values?: (string | number)[]
}

export const queryDatabase = async (query: IQuery): Promise<QueryResult['rows']> => {
  try {
    const res = await client.query(query.text, query.values);
    console.log(`Query "${query.key}" was successful`);
    
    return res.rows;
  } catch (err) {
    console.error(err);
  }
};