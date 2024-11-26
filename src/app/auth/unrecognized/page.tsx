import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

export default function UnrecognizedPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto p-6'>
        <div className='flex flex-col items-center text-center max-w-md'>
          <AlertCircle className='h-12 w-12 text-red-500 mb-4' />
          <h1 className='text-4xl font-bold mb-4'>Unrecognized Route</h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            We did not recognize this route
          </p>
          <Button asChild>
            <Link 
              href="/"
              className="flex items-center gap-2"
            >
              Return Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}