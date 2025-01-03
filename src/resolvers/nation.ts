import { NationResolvers } from '../__generated__/schema-types';
import { queryDatabase } from '../database/query';

export const clubs: NationResolvers['clubs'] = async (parent) => await queryDatabase({
  key: 'nation-clubs-query',
  text: 'SELECT * FROM clubs WHERE nation_id = $1',
  values: [parent.id],
});

export const players: NationResolvers['players'] = async (parent) => await queryDatabase({
  key: 'player-nations-query',
  text: 'SELECT p.name as name FROM player_nations pn INNER JOIN players p ON p.id = pn.player_id WHERE pn.nation_id = $1',
  values: [parent.id],
});