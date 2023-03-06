import { NextApiRequest, NextApiResponse } from 'next';

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
