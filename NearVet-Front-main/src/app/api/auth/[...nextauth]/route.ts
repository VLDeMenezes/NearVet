import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handdler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handdler as GET, handdler as POST };
