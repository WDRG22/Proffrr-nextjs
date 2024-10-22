'use client';

import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1).max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(255),
});

export const LoginForm = () => {
  const router = useRouter();
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
        redirect: false, // Disable auto-redirect
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        if (res.error === 'CredentialsSignin') {
          setError(
            'Invalid email or password. Please check your credentials and try again.'
          );
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else if (res?.ok) {
        const session = await getSession();
        const user = session?.user;

        // Redirect based on user type
        let redirectUrl = '/dashboard';
        if (user?.isAdmin) {
          redirectUrl = '/admin/dashboard';
        } else if (user?.isMerchant) {
          redirectUrl = '/merchant/dashboard';
        } else if (user?.isCustomer) {
          redirectUrl = '/customer/dashboard';
        }

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
    <div className='w-[600px] space-y-6 rounded-xl bg-grey-100 px-8 py-6 shadow-xl dark:bg-grey-900'>
      <h1 className='text-theme text-center text-2xl font-semibold'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Email'
                    className='w-full border-black placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      {...field}
                      placeholder='Password'
                      type={showPassword ? 'text' : 'password'}
                      className='w-full border-black pr-10 placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                    />
                    <button
                      type='button'
                      onClick={togglePasswordVisibility}
                      className='absolute inset-y-0 right-0 flex items-center pr-3'
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5 text-gray-500' />
                      ) : (
                        <Eye className='h-5 w-5 text-gray-500' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />

          {error && (
            <Alert className='relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
              <AlertDescription className='text-red-700'>
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type='submit'
            className='w-full rounded bg-green font-bold text-grey-200 hover:bg-green-600 dark:text-grey-900'
            size='lg'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className='text-theme text-center'>
            Need to create an account?{' '}
            <Link className='text-blue hover:underline' href='/signup'>
              Create Account
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
