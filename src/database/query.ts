import client from './client';

interface IQuery {
    key: string,
    text: string,
    values?: (string | number)[]
}

export const queryDatabase = async (query: IQuery) => {
    try {
        const res = await client.query(query.text, query.values);
        console.log(`Query "${query.key}" was successful`);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
};