import { query as q } from 'faunadb';

// ** Services
import { fauna } from '@/pages/services/fauna';
import { stripe } from '@/pages/services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  options = { createAction: false }
) {
  // ** Find user in FaunaDB with stripe_customer_id = customerId
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );

  // ** Find subscription data in Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // ** Save subscription data in FaunaDB
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (options.createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    );
  } else {
    await fauna.query(
      // ** Different from q.Update(), q.Replace() replaces the entire document
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))
        ),
        { data: subscriptionData }
      )
    );
  }
}
