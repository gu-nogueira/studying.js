import { NextApiRequest, NextApiResponse } from 'next';

// Next authentication strategies https://nextjs.org/docs/authentication
// JWT (Storage) 
// NextAuth (Social) https://next-auth.js.org/getting-started/example
// Cognito (AWS, integrates with NextAuth) https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html
// Auth0 (Social, auth as a service) https://auth0.com/docs/quickstart/webapp/nextjs

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const stripeCustomer = await stripe.customers.create({
        email,
        // metadata
      });

      return res.status(201).json({ customer: stripeCustomer });
    } catch (err) {
      return res.status(400).json({ error: { message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
