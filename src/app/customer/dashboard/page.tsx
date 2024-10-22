import { Navbar } from '@/components/Navbar';

export default function CustomerDashboardPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <h1>Customer Dashboard Page</h1>
      </main>
    </div>
  );
}
