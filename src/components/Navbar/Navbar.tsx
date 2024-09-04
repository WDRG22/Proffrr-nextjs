'use client'
import { useSession } from 'next-auth/react';
import LoggedOutNavbar from './LoggedOutNavbar';
import LoggedInNavbar from './LoggedInNavbar';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (!session) {
    return <LoggedOutNavbar />;
  }

  return <LoggedInNavbar userRole={session?.user?.role} />;
}