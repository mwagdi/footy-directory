import { queryDatabase } from '../database/query';
import { QueryResolvers } from '../__generated__/schema-types';

export const nations: QueryResolvers['nations'] = async () => await queryDatabase({
  key: 'nations-query',
  text: 'SELECT * FROM nations',
});

export const clubs: QueryResolvers['clubs'] = async () => await queryDatabase({
  key: 'clubs-query',
  text: 'SELECT * FROM clubs',
});

export const players: QueryResolvers['players'] = async () => await queryDatabase({
  key: 'players-query',
  text: 'SELECT * FROM players',
});

export const search: QueryResolvers['search'] = async (_, { input }) => {
  const nations = await queryDatabase({
    key: 'search-nations-query',
    text: 'SELECT * FROM nations WHERE name ILIKE $1',
    values: [`%${input}%`],
  });

  const clubs = await queryDatabase({
    key: 'search-clubs-query',
    text: 'SELECT * FROM clubs WHERE name ILIKE $1',
    values: [`%${input}%`],
  });

  const players = await queryDatabase({
    key: 'search-players-query',
    text: 'SELECT * FROM players WHERE name ILIKE $1',
    values: [`%${input}%`],
  });

  return {
    nations,
    clubs,
    players,
  };
};