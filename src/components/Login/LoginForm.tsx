'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTheme from '@/utils/theme'
import Navbar from '@/components/Navbar/Navbar'

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [theme, setTheme] = useTheme()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })

      if (!res?.error) {
        // Store user data (e.g., in local storage or context)
        const session = await fetch('/api/auth/session');
        const sessionData = await session.json();

        if (sessionData.user) {
          // Assuming 'isAdmin', 'isMerchant', and 'isCustomer' are properties of the user object
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
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}
