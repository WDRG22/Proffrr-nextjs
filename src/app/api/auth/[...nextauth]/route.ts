// NextAuth config

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google"
import { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';

const GOOGLE_AUTHORIZATION_URL = 
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code"
})

// OAuth: Refreshes access token
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) throw new Error("No refresh token");

    const response = await fetch("https://oauth2.googleapis.com/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_ID!,
        client_secret: process.env.GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      method: "POST",
    });
    const refreshedTokens = await response.json()
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Fall back to old refresh token, but allow rotation of refresh token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return token
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: GOOGLE_AUTHORIZATION_URL
    }),
  ],
  callbacks: {
    
    // Called when JWT token needs to be used
    // (i.e. logging in, or token refresh)
    // Adds user data to token
    async jwt({ token, account, user }) {
      const extendedToken = token as JWT
    
      // Initial sign in
      if (account && user) {

        // Google OAuth sign in 
        if (account.provider === 'google') {
          try {
            const response = await fetch(`${process.env.API_URL}/v1/user/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email: user.email,
              }),
            });
    
            if (response.ok) {
              const userData = await response.json();
              user = {
                id: userData.user_id,
                firstName: userData.first_name,
                email: userData.email,
                partnerId: userData.partner_id,
                isActive: userData.is_active,
                isAdmin: userData.is_admin,
                isMerchant: userData.is_merchant,
                isCustomer: userData.is_customer,
                isInternal: userData.is_internal,
              };
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            accessTokenExpires: account.expires_at! * 1000,
            user
          }        
        }

        // Credentials sign in
        return {
          ...token,
          user
        }
      }

      // Token Management

      // Token refresh for Google Auth
      if (token.refreshToken && Date.now() >= extendedToken.accessTokenExpires!) {
        return refreshAccessToken(extendedToken)
      }

      // Return token as-is for credentials auth
      return token
    },

    // When session is checked (i.e. calling useSession())
    // Add user data from token to session
    async session({ session, token } : {session: Session, token: JWT}) {
      console.log("SESSION CALLBACK")

      // Handle user data
      if (token.user) {
        session.user = {
          ...session.user as User,
          ...token.user as User
        }
      }
      
      session.accessToken = token.accessToken
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
