import NextAuth, { DefaultSession } from 'next-auth';

import type ActiveSubscription from './active-subscription';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** User subscription status. */
    activeSubscription: ActiveSubscription | null;
  }
}
