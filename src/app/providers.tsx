// Provides access to current user's session data
//  Used to implement authentication and authorization features

'use client';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: {children: React.ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>;   
}