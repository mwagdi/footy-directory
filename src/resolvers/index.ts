import * as Query from './query';
import * as Nation from './nation';
import * as Club from './club';
import * as Player from './player';
import * as Mutation from './mutation';
import { Resolvers } from '../__generated__/schema-types';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

export const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Query,
  Nation,
  Club,
  Player,
  Mutation,
};