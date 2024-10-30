import { PlayerResolvers } from '../__generated__/schema-types';
import { queryDatabase } from '../database/query';

export const club: PlayerResolvers['club'] = async (parent) => {
  const [result] = await queryDatabase({
    key: 'player-club-query',
    text: 'SELECT * FROM clubs WHERE id = $1',
    values: [parent.club_id],
  });

  return result;
};

export const nationalities: PlayerResolvers['nationalities'] = async (parent) => await queryDatabase({
  key: 'player-nationalities-query',
  text: 'SELECT name,id,flag,population FROM player_nations pn INNER JOIN nations n ON n.id = pn.nation_id WHERE pn.player_id = $1',
  values: [parent.id],
});