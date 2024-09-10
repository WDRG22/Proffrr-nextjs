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

// Define Zod schema
const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1).max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(255),
  confirmPassword: z.string().min(8).max(255),
  type_user: z.enum(["customer", "merchant", "admin"], {
    required_error: "You need to select a user type.",
  }),
  language: z.string().min(1, "Language is required").default("English"),
  is_internal: z.boolean().default(false),
  is_merchant: z.boolean().default(false),
  is_customer: z.boolean().default(false),
  is_admin: z.boolean().default(false),
  is_active: z.boolean().default(true),
  created_by: z.string().default("self"),
  roles: z.array(z.string()).optional(),
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
      type_user: "customer", // Default to "customer"
      language: "English",
      is_internal: false,
      is_active: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiResponse(null);
    setError(null);

    const { confirmPassword, type_user, ...apiValues } = values;

    const roles = type_user === "merchant" ? ["merchant"] : undefined;
    const payload = {
      ...apiValues,
      type_user: type_user.toUpperCase(),
      roles: roles,
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
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="first_name">First Name</FormLabel>
              <FormControl>
                <Input {...field} id="first_name" />
              </FormControl>
              <FormMessage />
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
                <Input {...field} id="last_name" />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="youremail@example.com" {...field} id="email" type="email" />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Enter your password" {...field} id="password" type="password" />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Confirm your password" {...field} id="confirmPassword" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* User Type */}
        <FormField
          control={form.control}
          name="type_user"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>User Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => form.setValue("type_user", value)}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="customer" />
                    </FormControl>
                    <FormLabel className="font-normal">Customer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="merchant" />
                    </FormControl>
                    <FormLabel className="font-normal">Merchant</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">Admin</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
      {/* Success Alert */}
      {apiResponse && (
        <Alert className="mt-4">
          <AlertDescription>
            Registration successful! Partner ID: {apiResponse.partner_id}
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
