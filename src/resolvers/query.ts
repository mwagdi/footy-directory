import { queryDatabase } from '../database/query';
import { QueryResolvers } from '../__generated__/schema-types';

export const nations: QueryResolvers['nations'] = async () => {
  return await queryDatabase({
    key: 'nations-query',
    text: 'SELECT * FROM nations',
  });
};

export const clubs: QueryResolvers['clubs'] = async () => {
  return await queryDatabase({
    key: 'clubs-query',
    text: 'SELECT * FROM clubs',
  });
};

export const players: QueryResolvers['players'] = async () => {
  return await queryDatabase({
    key: 'players-query',
    text: 'SELECT * FROM players',
  });
};