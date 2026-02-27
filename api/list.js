export default async function handler(req, res) {

  try {

    const response = await fetch(process.env.BLOB_PUBLIC_URL + "/participants.json");

    if (!response.ok) {
      return res.status(200).json([]);
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch {
    return res.status(200).json([]);
  }
}
