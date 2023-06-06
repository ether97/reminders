import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "../../../app/lib/prismadb";

import GithubProvier from "next-auth/providers/github";
import GoogleProvier from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvier({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvier({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }

        console.log(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log(user);

        if (!user || !user?.hashedPassword) {
          throw new Error("user doesnt exist or no hashed password");
        }

        console.log(user.hashedPassword, credentials.password);

        const isCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        console.log(isCorrect);

        if (!isCorrect) {
          throw new Error("invalid password!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
