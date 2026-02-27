import { kv } from "@vercel/kv";

export default async function handler(req, res) {

  try {

    const data = await kv.lrange("participants", 0, -1);

    const parsed = data.map(item => JSON.parse(item));

    return res.status(200).json(parsed.reverse());

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
