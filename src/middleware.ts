// Route protection middleware

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import type { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

const getUserRole = (user?: User): string | null => {
  if (user?.isAdmin) return "admin"
  if (user?.isMerchant) return "merchant"
  if (user?.isCustomer) return "customer"
  return null;
}

const isPublicRoute = (path: string): boolean => {
  return path === '/' || 
         path.startsWith('/auth/') || 
         path.startsWith('/public/') ||
         path === '/api/chat'
}

export default withAuth(
  function middleware(request: NextRequestWithAuth) {

    const token = request.nextauth.token as JWT;
    const currentUser = token?.user as User;
    const userRole = getUserRole(currentUser)
    const currentPath = request.nextUrl.pathname;

    // If authenticated user tries to access auth pages, redirect to their dashboard
    if (currentUser && (currentPath === '/auth/signin' || currentPath === '/auth/signup')) {      
      const redirectUrl = `${baseUrl}/${userRole}/dashboard`;
      return NextResponse.redirect(redirectUrl);      
    }

    // Check if user is trying to access a protected path they shouldn't
    if (currentPath.startsWith('/admin/') && userRole !== 'admin' ||
        currentPath.startsWith('/merchant/') && userRole !== 'merchant' ||
        currentPath.startsWith('/customer/') && userRole !== 'customer') {
      return NextResponse.redirect(`${baseUrl}/auth/unauthorized`);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        return isPublicRoute(path) ? true : !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/public/:path*',
    '/auth/signin',
    '/auth/signup',
    '/admin/:path*',
    '/merchant/:path*',
    '/customer/:path*',
    '/api/:path*',
  ]
};