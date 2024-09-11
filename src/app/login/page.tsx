import Link from 'next/link'
import { LoginForm } from '@/components/Login/LoginForm'
import Navbar from '@/components/Navbar/Navbar'

export default function LoginPage() {
  return (
    <>
    <Navbar />
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-card rounded-xl space-y-12">        
        <LoginForm />
      </div>
    </div>
    </>
  )
}