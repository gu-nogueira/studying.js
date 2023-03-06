import Stripe from 'stripe';

import projectPackage from '../../package.json';

const apiKey: string = process.env.STRIPE_API_KEY;

if (!apiKey) throw new Error('Stripe API key not found.');

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignews',
    version: projectPackage.version,
  },
});
