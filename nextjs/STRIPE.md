# Integração com o Stripe

* Acesse o [dashboard do Stripe](https://dashboard.stripe.com/login) e crie uma conta.

* Crie um novo projeto.

* Copie a chave pública e a chave privada.

* Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves públicas e privadas.

* Instale o pacote `stripe`:

```bash
yarn add stripe
```

* Crie um arquivo `stripe.ts` na pasta `services` e adicione o seguinte código:

```tsx
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
});
```

* Crie um arquivo `stripe-webhooks.ts` na pasta `pages/api` e adicione o seguinte código:

```tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      console.log('Evento recebido', event);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
```

* Crie um arquivo `webhooks.ts` na pasta `pages` e adicione o seguinte código:

```tsx
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { getStripeJs } from '../../services/stripe-js';

interface SubscribeProps {
  priceId: string;
}

export default function Subscribe({ priceId }: SubscribeProps) {
  async function handleSubscribe() {
    const session = await getSession();

    const stripe = await getStripeJs();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const price = await stripe.prices.retrieve('price_1IYq2pJZ7ZQZ2Z2Q2Z2Q2Z2Q', {
    expand: ['product'],
  });

  return {
    props: {
      priceId: price.id,
    },
  };
};
```

* Crie um arquivo `stripe-js.ts` na pasta `services` e adicione o seguinte código:

```tsx
import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

  return stripeJs;
}
```

* Crie um arquivo `subscribe.ts` na pasta `pages/api` e adicione o seguinte código:

```tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { stripe } from '../../services/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1IYq2pJZ7ZQZ2Z2Q2Z2Q2Z2Q', quantity: 1 },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
```
