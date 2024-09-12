import Link from 'next/link'
import { LoginForm } from '@/components/LoginForm'
import Navbar from '@/components/Navbar/Navbar'

export default function LoginPage() {
  return (
    <>
    <Navbar />
    <div className="h-full flex justify-center items-center bg-background">    
        <LoginForm />
    </div>
    </>
  )
}