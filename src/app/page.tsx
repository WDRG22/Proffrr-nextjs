import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <section>
          <h2 className="text-xl font-semibold mb-4">Get Premium Tires at Unbeatable Prices</h2>
          <p>Welcome to Proffer, your go-to source for top-quality tires at unbeatable prices.</p>
          <Link href="/chatbot">Get Started</Link >
        </section>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Proffer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
