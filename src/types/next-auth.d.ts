import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend NextAuth's Session and JWT modules' default User interfaces to
// include custom properties ('id' and 'email' are already in default type)
interface CustomUser {
  firstName: string;
  partnerId?: string;
  isActive: boolean;
  isAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
  isInternal: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: CustomUser & DefaultSession["user"]
  }
  
  interface User extends CustomUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomUser & DefaultSession["user"]
  }
}