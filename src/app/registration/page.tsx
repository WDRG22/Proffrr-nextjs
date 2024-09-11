import { RegistrationForm } from '@/components/Registration/RegistrationForm'
import Navbar from '@/components/Navbar/Navbar'

export default function RegistrationPage() {
  return (
    <>
      <Navbar />            
      <div className='flex flex-col flex-grow'>
        <div className='flex justify-center items-center pt-16'>
          <RegistrationForm />
        </div>
      </div>
    </>
  )
}