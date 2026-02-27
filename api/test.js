import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    await kv.set("ping", "pong");
    const value = await kv.get("ping");
    return res.status(200).json({ value });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
