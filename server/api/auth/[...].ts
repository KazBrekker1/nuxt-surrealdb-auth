import { NuxtAuthHandler } from "#auth";
import clientPromise from "~/server/surrealdb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SurrealDBAdapter } from "@auth/surrealdb-adapter";

export default NuxtAuthHandler({
  adapter: SurrealDBAdapter(clientPromise) as any,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const db = await clientPromise;
        const users = await db.select("user");
        const user = users.find((u) => u.email === credentials.email);
        if (!user) return null;
        if (!user.password)
          throw new Error(
            "Social login user cannot login with email and password"
          );
        const password_verified: boolean[] = await db.query(
          "crypto::argon2::compare($hash, $password)",
          {
            hash: user.password,
            password: credentials.password,
          }
        );
        if (password_verified[0]) {
          return user;
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
});
