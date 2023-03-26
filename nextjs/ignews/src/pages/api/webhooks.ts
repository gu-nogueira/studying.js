import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';

// ** Services
import { stripe } from '@/pages/services/stripe';
import requiredEnv from '@/utils/requiredEnv';
import { saveSubscription } from './_lib/manageSubscription';
import requiredFields from '@/utils/requiredFields';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

// ** This is a custom config for NextJS

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  const buf = await buffer(req);
  const secret = req.headers['stripe-signature'];

  if (!secret) {
    return res.status(400).send(`Webhook error: missing secret`);
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      secret,
      requiredEnv('STRIPE_WEBHOOK_SECRET')
    );
  } catch (error: any) {
    return res.send(`Webhook error: ${error.message}`);
  }

  const { type } = event;

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        // ** Listens to the 3 cases
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await saveSubscription(
            subscription.id,
            subscription.customer.toString(),
            // ** We're assuming that our subscriptions will be created by checkout.session.completed
            { createAction: false }
            // { createAction: type === 'customer.subscription.created' }
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          await saveSubscription(
            checkoutSession.subscription?.toString(),
            checkoutSession.customer?.toString(),
            { createAction: true }
          );
          break;
        default:
          throw new Error(`Unhandled event for type: ${type}`);
      }
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  }

  res.json({ received: true });
}
