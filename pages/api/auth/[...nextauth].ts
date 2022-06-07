import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { dbUsers } from "../../../src/db";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "email", type: "email", placeholder: " hola@hola.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: " 123fgt",
        },
      },
      async authorize(credentials) {
        // console.log({ credentials })
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),
    // ...add more providers here
  ],
  pages:{
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  //Callbacks
  callbacks: {
    async jwt({token, account, user}) {
      // console.log({token, account, user});
      if (account) {
        token.accessToken = account.access_token;
        switch( account.type ){
          case 'oauth':
            token.user = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || '')
          break
          case 'credentials':
            token.user = user;
          break
        }
      }
      return token
    },
    async session({session, token, user}) {
      // console.log({session, token, user});
      session.accessToken = token.accessToken;
      session.user = token.user as any
      return  session
    }
  }
});
