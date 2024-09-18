import { SignupForm } from '@/components/SignupForm';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <section className='bg-theme flex h-full flex-col items-center justify-center'>
        <SignupForm />
      </section>
    </>
  );
}
