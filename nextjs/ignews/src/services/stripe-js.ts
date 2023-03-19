// ** stripe-js is a package for allows stripe operations in client-side

import { loadStripe } from '@stripe/stripe-js';

// ** Utils
import requiredEnv from '@/utils/requiredEnv';

const publicApiKey = requiredEnv(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  public: true,
});

export async function getStripeJs() {
  const stripeJs = await loadStripe(publicApiKey);

  return stripeJs;
}
