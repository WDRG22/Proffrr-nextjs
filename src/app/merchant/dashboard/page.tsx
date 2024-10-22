import { Navbar } from '@/components/Navbar';

export default function MerchantDashboardPage() {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <h1>Merchant Dashboard Page</h1>
      </main>
    </div>
  );
}
