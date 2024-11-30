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