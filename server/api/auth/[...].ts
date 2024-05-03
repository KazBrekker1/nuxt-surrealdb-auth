import { NuxtAuthHandler } from "#auth";
import clientPromise from "~/server/surrealdb";
import GoogleProvider from "next-auth/providers/google";
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
  ],
  session: { strategy: "jwt" },
});
