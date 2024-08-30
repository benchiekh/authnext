import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const client = await pool.connect();

        try {
          const res = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          );

          const user = res.rows[0];

          if (user && credentials.password === user.password) {
            return { email: user.email };
          }

          return null;
        } finally {
          client.release();
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
      }
      return session;
    }
  },
  database: process.env.DATABASE_URL,
});
