// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Make a request to  FastAPI backend to authenticate the user
        const response = await fetch('http://127.0.0.1:8000/v1/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        const user = await response.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
