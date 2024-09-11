// Import necessary modules and components
'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

// Define Zod schema
const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1).max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(255),
  confirmPassword: z.string().min(8).max(255),
  language: z.string().min(1, "Language is required").default("English"),
  user_type: z.enum(["customer", "merchant", "admin"]),
  is_internal: z.boolean().default(false),
  is_active: z.boolean().default(true),
  created_by: z.string().default("dev"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      language: "English",
      user_type: "customer",
      is_internal: false,
      is_active: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiResponse(null);
    setError(null);

    const { confirmPassword, user_type, ...apiValues } = values;

    const payload = {
      ...apiValues,
      is_customer: user_type === "customer",
      is_merchant: user_type === "merchant",
      is_admin: user_type === "admin",
      created_at: new Date().toISOString(),      
    };
    console.log("Payload being sent to the backend:", payload);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="shadow-xl p-8 bg-card rounded-xl space-y-6 w-full sm:w-[400px] md:w-[500px] lg:w-[600px]">
      <h1 className="font-semibold text-2xl text-card-foreground text-center">Sign Up</h1>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <FormControl>
                  <Input {...field} id="first_name" className="w-full" />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} id="last_name" className="w-full" />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} id="email" type="email" className="w-full" />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Create a password" {...field} id="password" type="password" className="w-full" />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your password" {...field} id="confirmPassword" type="password" className="w-full" />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* User Type */}
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem className="py-4">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-center space-x-12"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="customer" />
                      </FormControl>
                      <FormLabel>Customer</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="merchant" />
                      </FormControl>
                      <FormLabel>Merchant</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel>Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" className="w-full bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        {/* Success Alert */}
        {apiResponse && (
          <Alert className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <AlertDescription>
              Registration successful! Partner ID: {apiResponse.partner_id}
            </AlertDescription>
          </Alert>
        )}
        {/* Error Alert */}
        {error && (
          <Alert className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Form>
      <p className="text-center text-primary">
        Already have an account?{' '}
        <Link className="text-link hover:underline text-blue" href="/login">Login here</Link>{' '}
      </p>
    </div>
  );
}