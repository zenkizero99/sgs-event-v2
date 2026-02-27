import { kv } from "@vercel/kv";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { name, company, wish } = req.body;

    if (!name || !company || !wish) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const entry = {
      id: Date.now(),
      name,
      company,
      wish,
      createdAt: Date.now()
    };

    await kv.lpush("participants", JSON.stringify(entry));

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
