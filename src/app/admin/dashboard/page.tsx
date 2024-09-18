import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <header>
        <h1>Welcome to the AdminDashboardPage</h1>
        <nav>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main></main>
      <footer>
        <p>&copy; 2024 Proffer. All rights reserved.</p>
      </footer>
    </div>
  );
}
