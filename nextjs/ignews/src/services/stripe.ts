import Stripe from 'stripe';

import projectPackage from '../../package.json';

const apiKey: string = process.env.STRIPE_API_KEY || '';

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignews',
    version: projectPackage.version,
  },
});
