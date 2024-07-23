import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <header>
        <h1>Welcome to Proffer</h1>
        <nav>
          <ul>
            <li><Link href="/admin/signup">Admin Signup</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="user/signup">User Signup</Link></li>
            <li><Link href="/chatbot">Chat Bot </Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Featured Products</h2>
        </section>
        <section>
          <h2>Categories</h2>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Proffer. All rights reserved.</p>
      </footer>
    </div>
  );
}