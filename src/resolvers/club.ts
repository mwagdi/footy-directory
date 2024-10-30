import { ClubResolvers } from '../__generated__/schema-types';
import { queryDatabase } from '../database/query';


export const nation: ClubResolvers['nation'] = async (parent) => {
  const [result] = await queryDatabase({
    key: 'club-nation-query',
    text: 'SELECT * FROM nations WHERE id = $1',
    values: [parent.nation_id],
  });

  return result;
};

export const players: ClubResolvers['players'] = async (parent) => await queryDatabase({
  key: 'club-players-query',
  text: 'SELECT * FROM players WHERE club_id = $1',
  values: [parent.id],
});