import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { createTables } from './database/tables';

const typeDefs = readFileSync('schema.graphql', 'utf8');

createTables();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
})();
