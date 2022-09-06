import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { v4 } from "uuid";
import { User } from "../../../lib/User";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET || "kissasanoomau",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.id_token;
        const { Item: user } = await User.get({
          email: token.email,
          sk: "user",
        });

        if (!user) {
          const { email, name } = token;
          User.put({ email, name: name as string | undefined, sk: v4() });
        }
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});
