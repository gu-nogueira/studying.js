import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// ** Services
import { api } from '@/services/api';
import { getStripeJs } from '@/services/stripe-js';

// ** Styles
import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';

export function SubscribeButton() {
  const { data: session } = useSession();

  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session?.activeSubscription) {
      router.push('/posts');
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

    // Checkout session creation
    // ** We must use API Routes to create a checkout session, to avoid exposing our Stripe secret key to the client-side code. **
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {session?.activeSubscription ? 'View posts' : 'Subscribe now'}
    </button>
  );
}
