import Link from 'next/link'
import { RegistrationForm } from '@/components/Registration/RegistrationForm'
import Navbar from '@/components/Navbar/Navbar'

export default function RegistrationPage() {
  return (
    <>
    <Navbar />
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-card rounded-xl space-y-12 w-full sm:w-[400px] md:w-[500px] lg:w-[600px]">
        <h1 className="font-semibold text-2xl text-card-foreground">Register</h1>
        <RegistrationForm />
        <p className="text-center text-primary">
          Already have an account?{' '}
          <Link className="text-primary hover:underline" href="/login">
            Login here
          </Link>{' '}
        </p>
      </div>
    </div>
    </>
  )
}