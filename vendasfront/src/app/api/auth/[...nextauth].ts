import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: "Iv23liUNEIs9SvUMgtTi",
        clientSecret: "265dbd9cef81276a48f3d3f4d24e482236e3bf9b",
      }),
      // ...add more providers here
    ],
  }
  