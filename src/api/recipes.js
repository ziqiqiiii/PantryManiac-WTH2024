import openai from "../../utils/openai";
import { getOrCreateAssistant } from "./assistance";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Step 1: Ensure the Assistant exists
    const assistant = await getOrCreateAssistant();

    // Step 2: Fetch Expiring Ingredients
    const db = await request.json();
    const collection = db.collection("food_items");

    const expiringItems = await collection
      .find({ expirationDate: { $lte: new Date() } })
      .toArray();

    const availableIngredients = expiringItems.map((item) => item.name);

    // Step 3: Generate Recipes with OpenAI
    const prompt = `
      Using the following ingredients: ${availableIngredients.join(", ")}, 
      suggest 4 recipes. Each recipe should include:
      - Recipe Name
      - Step-by-step instructions (max 5 steps)
      - Ingredients list (split into "Available" and "Needed" ingredients)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: assistant.instructions },
        { role: "user", content: prompt },
      ],
    });

    const recipes = JSON.parse(response.choices[0].message.content);

    res.status(200).json({ assistantId: assistant.id, recipes });
  } catch (error) {
    console.error("Error in recipes API:", error);
    res.status(500).json({ error: "Failed to generate recipes", details: error.message });
  } finally {
    await client.close();
  }
}