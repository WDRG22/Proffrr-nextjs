// NextAuth config

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions, User } from 'next-auth';

export const authOptions: NextAuthOptions = {
  // JWT session strategy
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      // Verify user credentials at login w/ backend api
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch(`${process.env.API_URL}/v1/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            return null
          }

          // Return user data to be encoded in JWT
          const user = await response.json();

          return {
            id: user.user_id,
            firstName: user.first_name,
            email: user.email,
            partnerId: user.partner_id,
            isActive: user.is_active,
            isAdmin: user.is_admin,
            isMerchant: user.is_merchant,
            isCustomer: user.is_customer,
            isInternal: user.is_internal,
          } as User;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    
    // When JWT is created or updated (i.e. logging in, or token refresh)
    // Add user data to token
    async jwt({ token, user }) {
      console.log("JWT CALLBACK")
      if (user) {
        token.user = user;
      }
      return token;
    },
    
    // When session is checked (i.e. calling useSession())
    // Add user data from token to session
    async session({ session, token }) {
      console.log("SESSION CALLBACK")
      if (token.user) {
        session.user = {
          ...session.user as User,
          ...token.user as User
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',  // Tells NextAuth where your custom sign in page is
    signOut: '/',            // Where to redirect after signing out
    error: '/auth/error',    // Custom error page location
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
