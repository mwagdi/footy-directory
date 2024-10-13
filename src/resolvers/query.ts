import { queryDatabase } from '../database/query';

export const nations = async () => {
    return await queryDatabase({
        key: 'nations-query',
        text: 'SELECT * FROM nations'
    });
};

export const clubs = async () => {
    return await queryDatabase({
        key: 'clubs-query',
        text: 'SELECT * FROM clubs'
    });
};

export const players = async () => {
    return await queryDatabase({
        key: 'players-query',
        text: 'SELECT * FROM players'
    });
};