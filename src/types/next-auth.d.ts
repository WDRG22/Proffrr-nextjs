import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

 // Custom properties to extend NextAuth's default User type
 // Note: 'id' and 'email' are already included in DefaultUser
interface CustomUser {
  firstName: string;
  partnerId?: string;
  isActive: boolean;
  isAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
  isInternal: boolean;
}

 // Adds custom properties to `session` object
declare module 'next-auth' {

  // Returned by `useSession`, `getSession` and received as prop on `SessionProvider` React Context
  interface Session {
    accessToken?: string;
    error?: string;
    user: CustomUser & DefaultSession['user'];
  }
 
  interface User extends DefaultUser, CustomUser {}
}

 // Adds custom properties to the `token` object
declare module 'next-auth/jwt' {

  // Returned by the `jwt` callback and `getToken`, when using JWT sessions
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user: CustomUser & DefaultSession['user'];
  }
}