import { queryDatabase } from '../database/query';

export const patchUpdate = async <T>(tableName: string, id: number, updates: T, key: string) => {
  const keys = Object.keys(updates);
  const values = Object.values(updates);
  const set = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

  const [result] = await queryDatabase({
    key,
    text: `UPDATE ${tableName}
           SET ${set}
           WHERE id = $1 RETURNING *`,
    values: [id, ...values],
  });

  return result;
};

export const linkNationToPlayer = async (playerId: number, nationIds: number[]) => {
  const nationalityIdValues = nationIds.map((_, index) => `($1, $${index + 2})`).join(', ');

  await queryDatabase({
    key: 'create-player-nation-query',
    text: `INSERT INTO player_nations (player_id, nation_id)
           VALUES ${nationalityIdValues}`,
    values: [playerId, ...nationIds],
  });

  const nationalities = await queryDatabase({
    key: 'player-nationalities-query',
    text: `SELECT *
           FROM nations
           WHERE ${nationIds.map(id => `id = $${id}`).join(' OR ')}`,
    values: [playerId],
  });

  return nationalities;
};