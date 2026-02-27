import { kv } from '@vercel/kv';

export default async function handler(req, res) {

  const data = await kv.lrange('participants', 0, -1);

  const parsed = data.map(item => JSON.parse(item));

  res.status(200).json(parsed.reverse());
}