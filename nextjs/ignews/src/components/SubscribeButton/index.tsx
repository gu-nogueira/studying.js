import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// ** Services
import { api } from '@/pages/services/api';
import { getStripeJs } from '@/pages/services/stripe-js';

// ** Styles
import styles from './styles.module.scss';

export function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({
        sessionId,
      });
    } catch (error: any) {
      alert(error.message);
    }

    // if (session.activeSubscription) {
    //   router.push('/posts');
    //   return;
    // }

    // Checkout session creation
    // ** We must use API Routes to create a checkout session, to avoid exposing our Stripe secret key to the client-side code. **
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
