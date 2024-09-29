import Google from "next-auth/providers/google"
import { prisma } from "./prisma";
import { env } from "./env";
 
const authOptions = {
  secret: env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [Google({
    clientId: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    clientSecret: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
  })],
  callbacks: {
    // @ts-expect-error - type error
    async signIn({ account, profile }) {
      if (account.provider === "google" && profile.email_verified) {
        const select = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!select) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              imageUrl: profile.picture,
            },
          });
        }
      }

      return true;
    },
  },
}

export { authOptions }