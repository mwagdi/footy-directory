import { Player } from '../__generated__/schema-types';
import { queryDatabase } from '../database/query';

export const club = async (parent: Player) => {
    const [result] = await queryDatabase({
        key: 'player-club-query',
        text: 'SELECT * FROM clubs WHERE id = $1',
        values: [parent.club_id]
    });

    return result;
};

export const nationalities = async (parent: Player) => {
    return await queryDatabase({
        key: 'player-nationalities-query',
        text: 'SELECT n.name as name FROM player_nations pn INNER JOIN nations n ON n.id = pn.nation_id WHERE pn.player_id = $1',
        values: [parent.id]
    });
};