// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Les champs email et mot de passe sont requis.' });
  }

  try {
    const hashedPassword = await hash(password, 12);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    const userId = result.rows[0].id;

    res.status(201).json({ message: 'Utilisateur créé avec succès', userId });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
  }
}
