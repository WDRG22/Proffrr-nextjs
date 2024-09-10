import { RegistrationForm } from '@/components/Registration/RegistrationForm'
import Navbar from '@/components/Navbar/Navbar'

export default function RegistrationPage() {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Navbar />            
      <div className='flex flex-1 justify-center items-center'>
        <RegistrationForm />
      </div>
    </div>
  )
}