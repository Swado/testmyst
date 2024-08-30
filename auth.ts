import NextAuth, { type NextAuthConfig } from "next-auth";
import { SurrealDBAdapter } from "@auth/surrealdb-adapter";
import GoogleProvider from "next-auth/providers/google";
import { surrealConnection, surrealDatabase } from "./utils/surreal/surreal";
import Surreal from "surrealdb.js";

const namespace = process.env.NEXT_PUBLIC_NAMESPACE as string;
const database = process.env.NEXT_PUBLIC_DB_NAME as string;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SurrealDBAdapter<Surreal>(surrealConnection()),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile) {
        console.log({ profile });
        token.googleSub = profile.sub;

        try {
          await surrealConnection();

          await surrealDatabase.signin({
            namespace,
            database,
            scope: "users",
            sub: profile.sub,
            email: token.email,
          });
        } catch {
          // otherwise sign up
          await surrealDatabase.signup({
            namespace,
            database,
            scope: "users",
            sub: profile.sub,
            name: token.name,
            email: token.email,
            picture: token.picture,
          });
        }
      }

      return token;
    },
  },
});

// export default NextAuth(handlers);
