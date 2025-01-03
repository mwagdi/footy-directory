import { MutationResolvers } from '../__generated__/schema-types';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { queryDatabase } from '../database/query';
import { Context } from '../types';
import { uploadToS3 } from '../utils';
import { linkNationToPlayer, patchUpdate } from '../utils/query-utils';

export const signup: MutationResolvers['signup'] = async (_, { input }) => {
  const { password: plainTextPassword, email, first_name, last_name, avatar } = input;
  const password = await hash(plainTextPassword, 10);

  try {
    const path = await uploadToS3(avatar);

    const [user] = await queryDatabase({
      key: 'create-user-query',
      text: 'INSERT INTO users (email, password, first_name, last_name, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [email, password, first_name, last_name, path],
    });

    const token = sign({ userId: user.id }, process.env.APP_SECRET as string);

    return { token, user };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

export const login: MutationResolvers['login'] = async (_, { input }) => {
  const { password, email } = input;

  try {
    const [user] = await queryDatabase({
      key: 'get-user-query',
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    });

    if (!user) {
      throw new Error('No user found');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = sign({ userId: user.id }, process.env.APP_SECRET as string);

    return { token, user };
  } catch (error) {
    console.error(error);
  }
};

export const createNation: MutationResolvers<Context>['createNation'] = async (_, { input }, { userId }) => {
  const { name, population, flag } = input;

  try {
    if (!userId) throw new Error('Not authenticated');

    const path = await uploadToS3(flag);

    const [nation] = await queryDatabase({
      key: 'create-nation-query',
      text: 'INSERT INTO nations (name, population, flag) VALUES ($1, $2, $3) RETURNING *',
      values: [name, population, path],
    });

    return nation;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create nation');
  }
};

export const updateNation: MutationResolvers<Context>['updateNation'] = async (_, { input }, { userId }) => {
  const { id, ...updates } = input;

  try {
    if (!userId) throw new Error('Not authenticated');


    if (updates.flag) {
      const path = await uploadToS3(updates.flag);
      updates.flag = path;
    }

    return await patchUpdate('nations', id, updates, 'update-nation-query');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update nation');
  }
};

export const createClub: MutationResolvers<Context>['createClub'] = async (_, { input }, { userId }) => {
  const { name, nation_id, logo } = input;

  try {
    if (!userId) throw new Error('Not authenticated');

    const path = await uploadToS3(logo);

    const [club] = await queryDatabase({
      key: 'create-club-query',
      text: 'INSERT INTO clubs (name, nation_id, logo) VALUES ($1, $2, $3) RETURNING *',
      values: [name, nation_id, path],
    });

    return club;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create club');
  }
};

export const updateClub: MutationResolvers<Context>['updateClub'] = async (_, { input }, { userId }) => {
  const { id, ...updates } = input;

  try {
    if (!userId) throw new Error('Not authenticated');

    if (updates.logo) {
      const path = await uploadToS3(updates.logo);
      updates.logo = path;
    }

    return await patchUpdate('clubs', id, updates, 'update-club-query');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update club');
  }
};

export const createPlayer: MutationResolvers<Context>['createPlayer'] = async (_, { input }, { userId }) => {
  const { name, club_id, avatar, birthdate, nationality_ids } = input;

  try {
    if (!userId) throw new Error('Not authenticated');

    const path = await uploadToS3(avatar);

    const [player] = await queryDatabase({
      key: 'create-player-query',
      text: 'INSERT INTO players (name, club_id, avatar, birthdate) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [name, club_id, path, birthdate],
    });

    const nationalities = await linkNationToPlayer(player.id, nationality_ids);

    return { ...player, nationalities };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create player');
  }
};

export const updatePlayer: MutationResolvers<Context>['updatePlayer'] = async (_, { input }, { userId }) => {
  const { id, nationality_ids, ...updates } = input;

  try {
    if (!userId) throw new Error('Not authenticated');

    if (updates.avatar) {
      const path = await uploadToS3(updates.avatar);
      updates.avatar = path;
    }

    const player = await patchUpdate('players', id, updates, 'update-player-query');

    if (nationality_ids) {
      await queryDatabase({
        key: 'delete-player-nations-query',
        text: 'DELETE FROM player_nations WHERE player_id = $1',
        values: [id],
      });

      const nationalities = await linkNationToPlayer(id, nationality_ids);

      return { ...player, nationalities };
    }


  } catch (error) {
    console.error(error);
    throw new Error('Failed to update player');
  }
};