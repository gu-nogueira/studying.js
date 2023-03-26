import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { query as q } from 'faunadb';

// ** Services
import { fauna } from '@/services/fauna';

// ** Helpers
import requiredEnv from '@/utils/requiredEnv';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: requiredEnv('GITHUB_CLIENT_ID'),
      clientSecret: requiredEnv('GITHUB_CLIENT_SECRET'),
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // GoogleProvider({
    //   clientId: requiredEnv("GOOGLE_CLIENT_ID"),
    //   clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    // })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      // ** Get user data from fauna

      try {
        const email = session.user?.email || user?.email;

        if (!email) {
          throw new Error('User email not found');
        }

        const userActiveSubscription = await fauna.query(
          // ** We want to get a query that matches with two conditions> user email and active subscription. We can use a intersection query. In order to match both conditions
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
                )
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        } as Session;
      } catch (error) {
        return {
          ...session,
          activeSubscription: null,
        } as Session;
      }
    },
    async signIn({ user }) {
      try {
        const email = user?.email;

        if (!email) {
          throw new Error('User email not found');
        }

        /* Tips about fauna:
         * - q.If(condition, ifTrue, ifFalse)
         * - Data can only be found by indexes (in this case, user_by_email)
         */
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))
            ),
            q.Create(q.Collection('users'), {
              data: { email: email },
            }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
          )
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
