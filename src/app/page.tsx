import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer/Footer';

const IndexPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex-col bg-background">
        <main className=" mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-grey-darkest">
              Get Premium Tires at Unbeatable Prices
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-grey-dark">
              Welcome to Proffer, your go-to source for top-quality tires that won't break the bank.
            </p>
            <div className="space-x-4">
              <Link
                href="/chatbot"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded text-white bg-green hover:bg-green-dark transition duration-150 ease-in-out"
              >
                Get Started
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;