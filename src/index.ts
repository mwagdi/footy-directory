import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { resolvers } from './resolvers';
import { createTables } from './database/tables';
import { decodeAuthHeader } from './utils';
import { Context } from './types';
import { expressMiddleware } from '@apollo/server/express4';
import multer from 'multer';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

dotenv.config();

const typeDefs = readFileSync('schema.graphql', 'utf8');

createTables();

const app = express();

const httpServer = http.createServer(app);

app.use(graphqlUploadExpress());

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  try {
    await server.start();

    app.use(
      '/',
      cors<cors.CorsRequest>({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const token =
            req && req.headers.authorization
              ? decodeAuthHeader(req.headers.authorization)
              : null;

          return {
            userId: token?.userId,
          };
        },
      }),
    );

    const upload = multer({ dest: 'uploads/' });
    app.use(upload.single('file'));

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT as unknown as number || 4000 }, resolve),
    );
    console.log('🚀 Server ready at http://localhost:4000/');
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();

httpServer.on('error', (err) => {
  console.error('HTTP Server Error:', err);
});