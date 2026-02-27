import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  await kv.set("hello", "world");
  const value = await kv.get("hello");
  res.status(200).json({ value });
}