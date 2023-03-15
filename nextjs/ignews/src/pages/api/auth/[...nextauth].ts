import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { query as q } from 'faunadb';

// ** Services
import { fauna } from '@/services/fauna';

// ** Helpers
import requiredEnv from '@/utils/requiredEnv';

export const authOptions = {
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
    async signIn({ user }) {
      try {
        /* Tips about fauna:
         * - q.If(condition, ifTrue, ifFalse)
         * - Data can only be found by indexes (in this case, user_by_email)
         */
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection('users'), {
              data: { email: user.email },
            }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
          )
        );
        return true;
      } catch (error) {
        console.error('is getting here: ', error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
