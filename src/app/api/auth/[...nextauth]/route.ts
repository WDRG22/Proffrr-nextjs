import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import User from '@/types/user';

// Type guard function
function isUser(user: unknown): user is User {
  return typeof user === 'object' && user !== null && (
    'id' in user &&
    'userId' in user &&
    'firstName' in user &&
    'email' in user &&
    'partnerId' in user &&
    'isActive' in user &&
    'isAdmin' in user &&
    'isMerchant' in user &&
    'isCustomer' in user &&
    'isInternal' in user
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('No credentials provided');
          throw new Error('No credentials provided');
        }
        try {
          console.log('Attempting to login with:', credentials.email);
          console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          if (!response.ok) {
            console.error('Login failed:', response.status, response.statusText);
            const errorBody = await response.text();
            console.error('Error body:', errorBody);
            throw new Error(`Login failed: ${response.status} ${response.statusText}`);
          }

          const user: User | null = await response.json(); // Explicitly typed as User | null
          console.log('Login successful, user data:', user);
          if (user) {
            return user; // No need for explicit type casting
          } else {
            console.error('No user data returned from API');
            return null;
          }
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (isUser(token.user)) {
        const user = token.user;
        session.user = {
          ...session.user,
          id: user.id,
          userId: user.userId,
          firstName: user.firstName,
          partnerId: user.partnerId,
          isActive: user.isActive,
          isAdmin: user.isAdmin,
          isMerchant: user.isMerchant,
          isCustomer: user.isCustomer,
          isInternal: user.isInternal,
        } as User;
      } else {
        // Handle the case where token.user is not of type User
        console.error('Unexpected user data format');
      }
      return session;
    },
  },
  debug: true, // Enable debug messages
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };