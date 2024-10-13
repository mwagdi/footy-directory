import * as Query from './query';
import * as Nation from './nation';
import * as Club from './club';
import * as Player from './player';
import * as Mutation from './mutation';
import { Resolvers } from '../__generated__/schema-types';

export const resolvers: Resolvers = {
  Query,
  Nation,
  Club,
  Player,
  Mutation,
};