import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { createTables } from './database/tables';
import { decodeAuthHeader } from './utils';
import { Context } from './types';

dotenv.config();

const typeDefs = readFileSync('schema.graphql', 'utf8');

createTables();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT as unknown as number || 4000 },
    context: async ({ req }) => {
      const token =
        req && req.headers.authorization
          ? decodeAuthHeader(req.headers.authorization)
          : null;

      return {
        userId: token?.userId,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
