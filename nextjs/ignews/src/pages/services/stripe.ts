import Stripe from 'stripe';

// ** Utils
import requiredEnv from '@/utils/requiredEnv';

import projectPackage from '../../../package.json';

const apiKey = requiredEnv('STRIPE_API_KEY');

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignews',
    version: projectPackage.version,
  },
});
