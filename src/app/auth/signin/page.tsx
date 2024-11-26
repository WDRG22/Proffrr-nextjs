import { SignInForm } from '@/components/SignInForm';
import { Navbar } from '@/components/Navbar';

export default function SignInPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <SignInForm />
      </main>
    </div>
  );
}
