import { Club } from '../__generated__/schema-types';
import { queryDatabase } from '../database/query';


export const nation = async (parent: Club) => {
    const [result] = await queryDatabase({
        key: 'club-nation-query',
        text: 'SELECT * FROM nations WHERE id = $1',
        values: [parent.nation_id]
    });

    return result;
};

export const players = async (parent: Club) => {
    return await queryDatabase({
        key: 'club-players-query',
        text: 'SELECT * FROM players WHERE club_id = $1',
        values: [parent.id]
    });
};