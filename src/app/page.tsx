import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import styles from '../styles/globals.css';

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <section>
          <h2 className="text-xl font-semibold mb-4">Get Premium Tires at Unbeatable Prices</h2>
          <p>Welcome to Proffer, your go-to source for top-quality tires at unbeatable prices.</p>
          <ul>
            <li>
              <Link href="/customer/dashboard">Customer Dashboard</Link>
            </li>
            <li>
              <Link href="/merchant/dashboard">Merchant Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link href="/chatbot">Chatbot</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;
