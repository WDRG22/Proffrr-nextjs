import { SignupForm } from '@/components/SignupForm';
import { Navbar } from '@/components/Navbar';

export default function SignupPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <SignupForm />
      </main>
    </div>
  );
}
