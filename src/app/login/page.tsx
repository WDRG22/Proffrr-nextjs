import { LoginForm } from '@/components/LoginForm';
import { Navbar } from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <LoginForm />
      </main>
    </div>
  );
}
