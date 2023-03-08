import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

// ** Helpers
import requiredEnv from "@/utils/requiredEnv"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
      authorization: {
        params: {
          scope: "read:user"
        }
      }
    }),
    // GoogleProvider({
    //   clientId: requiredEnv("GOOGLE_CLIENT_ID"),
    //   clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    // })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)