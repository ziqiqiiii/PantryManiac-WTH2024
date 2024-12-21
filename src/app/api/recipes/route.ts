import openai from "../../../../utils/openai";
import { getOrCreateAssistant } from "../assistance/route";
import type { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  try {
    console.log("Generating recipes... API");

    // Step 1: Ensure the Assistant exists
    const assistant = await getOrCreateAssistant();

    // Step 2: Fetch Expiring Ingredients from MongoDB
    const db = wait.fetch('/dummy_food_data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
    const collection = db.collection("food_items");

    const expiringItems = await collection
      .find({ "expiry/best-before-date": { $lte: new Date() } })
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

    const recipes = JSON.parse(response.choices[0].message.content || "[]");

    return Response.json({ assistantId: assistant.id, recipes });
  } catch (error) {
    console.error("Error in recipes API:", error);
    return Response.json(
      { error: "Failed to generate recipes", details: error.message },
      { status: 500 }
    );
  }
}
