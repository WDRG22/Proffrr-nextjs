'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1).max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(255),  
});

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else if (res?.ok) {
        // Fetch user data from your API
        const userResponse = await fetch('/api/user'); // You'll need to implement this API route
        const userData = await userResponse.json();

        // Determine redirect based on user type
        let redirectUrl = '/dashboard'; // Default redirect
        if (userData.is_admin) {
          redirectUrl = '/admin-dashboard';
        } else if (userData.is_merchant) {
          redirectUrl = '/merchant-dashboard';
        } else if (userData.is_customer) {
          redirectUrl = '/customer-dashboard';
        }

        // Store user data in localStorage or state management solution
        localStorage.setItem('userData', JSON.stringify(userData));

        router.push(redirectUrl);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full sm:w-[400px]">
        <h1 className="font-semibold text-2xl text-card-foreground">Login</h1>
       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" className="w-full" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    {...field} 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pr-10" 
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {error && (
          <Alert className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full text-white bg-green hover:bg-green-dark rounded"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-center text-primary">
          Need to create an account?{' '}
          <Link className="text-blue hover:underline" href="/registration">
            Create Account
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;