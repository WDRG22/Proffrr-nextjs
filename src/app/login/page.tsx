import Link from 'next/link';
import { LoginForm } from '@/components/LoginForm';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className='bg-theme flex h-full items-center justify-center'>
        <LoginForm />
      </div>
    </>
  );
}
