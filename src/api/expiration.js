import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("your_db_name");
    const collection = db.collection("food_items");

    const expiringItems = await collection
      .find({ expirationDate: { $lte: new Date() } })
      .toArray();

    res.status(200).json({ data: expiringItems });
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  } finally {
    await client.close();
  }
}
