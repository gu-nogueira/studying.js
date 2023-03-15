import { Client } from 'faunadb';

// ** Utils
import requiredEnv from '@/utils/requiredEnv';

export const fauna = new Client({
  secret: requiredEnv('FAUNADB_KEY'),
});
