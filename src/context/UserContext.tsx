'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserContextType {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string | null;
  } | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode}) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setUser({  email: session.user.email, role: session.user.role }); // Extract necessary user information
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
