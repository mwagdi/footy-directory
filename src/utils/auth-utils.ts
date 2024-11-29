import { verify } from 'jsonwebtoken';

interface AuthTokenPayload {
  userId: number;
}

export const decodeAuthHeader = (authHeader: string) => {
  const [_, token] = authHeader.split(' ');

  if (!token) {
    throw new Error('No token found');
  }

  return verify(token, process.env.APP_SECRET as string) as AuthTokenPayload;
};