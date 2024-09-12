import { SignupForm } from '@/components/SignupForm'
import Navbar from '@/components/navbar/Navbar'

export default function SignupPage() {
  return (
    <>
      <Navbar />            
      <section className='h-full flex flex-col justify-center items-center bg-background'>
          <SignupForm />
      </section>
    </>
  )
}