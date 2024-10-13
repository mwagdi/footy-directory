import { MutationResolvers } from '../__generated__/schema-types';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { queryDatabase } from '../database/query';

export const signup: MutationResolvers['signup'] = async (_, { input }) => {
  const { password: plainTextPassword, email, first_name, last_name, avatar } = input;
  const password = await hash(plainTextPassword, 10);

  try {
    const [user] = await queryDatabase({
      key: 'create-user-query',
      text: 'INSERT INTO users (email, password, first_name, last_name, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [email, password, first_name, last_name, avatar],
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