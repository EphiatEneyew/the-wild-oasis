import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    authorized({auth, request}) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }){
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) 
          await createGuest({ email: user.email, fullName: user.name }); 
      
        return true;
      } catch {
        return false;
      }
      
    },

    async session({session, user}) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
}
//export default NextAuth(authOptions)
export const { auth, signIn, signOut, handlers: {GET, POST} } = NextAuth(authOptions);

