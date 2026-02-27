import { kv } from '@vercel/kv';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, wish } = req.body;

  if (!name || !company || !wish) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const entry = {
    id: Date.now(),
    name,
    company,
    wish,
    time: Date.now()
  };

  await kv.lpush('participants', JSON.stringify(entry));

  res.status(200).json({ success: true });
}