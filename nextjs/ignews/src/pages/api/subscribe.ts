import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { query as q } from 'faunadb';

// ** Services
import { stripe } from '@/services/stripe';
import { fauna } from '@/services/fauna';

// ** Utils
import requiredEnv from '@/utils/requiredEnv';

// ** Auth options
import { authOptions } from './auth/[...nextauth]';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  // ** To get user data from NextAuth, we need to use getSession, that picks the cookie from the request (localStorage is not available on the server)
  // ** On next-auth, we can get user cookie token from 'req.cookies' or 'req.headers'
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // ** We can pass the return from fauna.query() using a generic type (User)
    // ** Generic types is a way to tell typescript what type of data we are expecting from fauna.query()
    // ** We can know the type of data we are expecting from fauna.query() by hovering the fauna.query() and checking it can receives a generic
    const faunaUser = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
    );

    let customerId = faunaUser.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      });
      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), faunaUser.ref.id), {
          // ** faunaUser.ref.id is the user id
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );
      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1McSeLI3UlqWg0mQObIeCdma',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: requiredEnv('STRIPE_SUCCESS_URL'),
      cancel_url: requiredEnv('STRIPE_CANCEL_URL'),
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
