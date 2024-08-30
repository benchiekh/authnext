// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur notre application</h1>
      <p className="text-lg mb-4">Vous pouvez vous inscrire ou vous connecter pour accéder aux fonctionnalités.</p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/signup"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          S'inscrire
        </Link>
        <Link
          href="/login"
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Se connecter
        </Link>
      </div>
    </main>
  );
}
