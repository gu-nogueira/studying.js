import styles from './styles.module.scss';

export function SubscribeButton() {
  // const [session] = useSession();
  // const router = useRouter();

  // function handleSubscribe() {
  //   if (!session) {
  //     signIn('github');
  //     return;
  //   }

  //   if (session.activeSubscription) {
  //     router.push('/posts');
  //     return;
  //   }

  //   // criação da checkout session
  // }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      // onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
