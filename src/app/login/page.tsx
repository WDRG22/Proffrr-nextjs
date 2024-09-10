import Link from 'next/link'
import { LoginForm } from '@/components/Login/LoginForm'
import Navbar from '@/components/Navbar/Navbar'

export default function LoginPage() {
  return (
    <>
    <Navbar />
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-card rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl text-card-foreground">Login</h1>
        <LoginForm />
        <p className="text-center text-primary">
          Need to create an account?{' '}
          <Link className="text-primary hover:underline" href="/registration">
            Create Account
          </Link>{' '}
        </p>
      </div>
    </div>
    </>
  )
}