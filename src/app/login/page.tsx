'use client'

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Fetch the user session to get the role information
        const session = await fetch('/api/auth/session');
        const sessionData = await session.json();

        if (sessionData.user) {
          if (sessionData.user.isAdmin) {
            router.push('/admin-dashboard');
          } else if (sessionData.user.isMerchant) {
            router.push('/merchant-dashboard');
          } else if (sessionData.user.isCustomer) {
            router.push('/customer-dashboard');
          } else {
            // Default route if no specific role is matched
            router.push('/dashboard');
          }
        } else {
          setError('Failed to fetch user session');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}