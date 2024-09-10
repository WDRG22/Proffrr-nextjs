import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Get Premium Tires at Unbeatable Prices
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Welcome to Proffer, your go-to source for top-quality tires that won't break the bank.
          </p>
          <div className="space-x-4">
            <Link 
              href="/shop" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Proffer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;