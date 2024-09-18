import Link from 'next/link';

export default function CustomerDashboardPage() {
  return (
    <div>
      <header>
        <h1>Welcome to the CustomerDashboard Page</h1>
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
