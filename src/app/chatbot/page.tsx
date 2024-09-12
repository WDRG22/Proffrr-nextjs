import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';

export default function ChatbotPage() {
  return (
    <>
    <Navbar />
    <div>
      <header>
        <h1>Welcome to the ChatbotPage</h1>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
          </ul>
        </nav>
      </header>
      <main>
      </main>
      <footer>
        <p>&copy; 2024 Proffer. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}