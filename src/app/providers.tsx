// Provides access to current user's session data
//  Used to implement authentication and authorization features

'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system'>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
