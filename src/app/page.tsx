import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Link from 'next/link';


const IndexPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col justify-center bg-background">
        <main className=" mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-grey-darkest dark:text-white">
              Get Premium Tires at Unbeatable Prices
            </h1>
            <div className="space-x-4">
              <Link
                href="/chatbot"
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-black bg-green-500 hover:bg-green-700 transition duration-150 ease-in-out"
              >
                Get Started
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default IndexPage;