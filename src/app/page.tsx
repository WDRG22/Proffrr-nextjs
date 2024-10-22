import React from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='text-theme mb-6 text-6xl font-bold'>
            Get Premium Tires at Unbeatable Prices
          </h1>
          <div className='space-x-4'>
            <Link
              href='/chat'
              className='text-theme inline-flex items-center rounded-lg bg-green-500 px-6 py-3 font-medium transition duration-150 ease-in-out hover:bg-green-700'
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
