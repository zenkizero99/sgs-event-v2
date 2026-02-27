import { put, list } from "@vercel/blob";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { name, company, wish } = req.body;

    if (!name || !company || !wish) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Lấy file cũ nếu có
    let participants = [];

    try {
      const response = await fetch(process.env.BLOB_PUBLIC_URL + "/participants.json");
      if (response.ok) {
        participants = await response.json();
      }
    } catch {}

    participants.push({
      id: Date.now(),
      name,
      company,
      wish
    });

    // Ghi lại file
    await put("participants.json", JSON.stringify(participants, null, 2), {
      access: "public",
      contentType: "application/json"
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}