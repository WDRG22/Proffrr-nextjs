// Import necessary modules and components
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Form schema uses zod for validation
const formSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address').min(1).max(255),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(255),
    confirmPassword: z.string(),
    language: z.string().min(1, 'Language is required').default('English'),
    user_type: z.enum(['customer', 'merchant', 'admin']),
    is_internal: z.boolean().default(false),
    is_active: z.boolean().default(true),
    created_by: z.string().default('dev'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      language: 'English',
      user_type: 'customer',
      is_internal: false,
      is_active: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSignUpSuccess(false);
    setError(null);

    try {
      const response = await fetch(`api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSignUpSuccess(true);
      router.push('/auth/signin');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='flex-column w-[600px] items-center justify-center overflow-y-auto rounded-lg bg-grey-100 p-6 shadow-xl dark:bg-grey-900'>
      <h1 className='text-theme pb-6 text-center text-2xl font-semibold'>
        Sign Up
      </h1>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3'
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    id='first_name'
                    placeholder='First name'
                    className='w-full border-black placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                  />
                </FormControl>
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    id='last_name'
                    placeholder='Last name'
                    className='w-full border-black placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                  />
                </FormControl>
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    id='email'
                    placeholder='Email'
                    className='w-full border-black placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                  />
                </FormControl>
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Create a password'
                      {...field}
                      id='password'
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
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Confirm your password'
                      {...field}
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      className='w-full border-black pr-10 placeholder-grey-700 dark:border-white dark:placeholder-grey-400'
                    />
                    <button
                      type='button'
                      onClick={toggleConfirmPasswordVisibility}
                      className='absolute inset-y-0 right-0 flex items-center pr-3'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-5 w-5 text-gray-500' />
                      ) : (
                        <Eye className='h-5 w-5 text-gray-500' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />
          {/* User Type */}
          <FormField
            control={form.control}
            name='user_type'
            render={({ field }) => (
              <FormItem className='py-3'>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex justify-center space-x-12'
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem
                          value='customer'
                          className='border-black dark:border-white'
                        />
                      </FormControl>
                      <FormLabel>Customer</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem
                          value='merchant'
                          className='border-black dark:border-white'
                        />
                      </FormControl>
                      <FormLabel>Merchant</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem
                          value='admin'
                          className='border-black dark:border-white'
                        />
                      </FormControl>
                      <FormLabel>Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className='text-red' />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type='submit'
            className='w-full rounded bg-green px-4 py-2 font-bold text-grey-200 hover:bg-green-600 dark:text-grey-900'
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        {/* Success Alert */}
        {signUpSuccess && (
          <Alert className='mt-4 rounded border border-green bg-green-200 text-green-900'>
            <AlertDescription>Sign up successful!</AlertDescription>
          </Alert>
        )}
        {/* Error Alert */}
        {error && (
          <Alert className='relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Form>
      <p className='text-theme pt-3 text-center'>
        Already have an account?{' '}
        <Link className='text-link text-blue hover:underline' href='/auth/signin'>
          Login here
        </Link>{' '}
      </p>
    </div>
  );
};
