import openai from "../../../../utils/openai";
import { getOrCreateAssistant } from "../assistance/route";
import type { NextRequest } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    console.log("Generating recipes... API");

    // Step 1: Ensure the Assistant exists
    const assistant = await getOrCreateAssistant();

    // Step 2: Fetch Expiring Ingredients from JSON
    const filePath = path.join(process.cwd(), 'public', 'dummy_food_data.json');
    const db = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const expiringItems = db.filter((item: any) => {
      const expiryDate = new Date(item["expiry/best-before-date"]);
      const currentDate = new Date();
      return expiryDate <= currentDate;
    });
    console.log("Expiring Items:", expiringItems);
    const availableIngredients = expiringItems.map((item: any) => item.name);
    console.log("Available Ingredients:", availableIngredients);

    // Step 3: Generate Recipes with OpenAI
    const prompt = `Using the following ingredients: ${availableIngredients.join(", ")}, 
      suggest 4 recipes. Each recipe should include:
      it should be stored in a dictionary with the following:
      - Recipe Name
      - Step-by-step instructions
      - Ingredients list (separated into available and needed)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: assistant.instructions },
        { role: "user", content: prompt },
      ],
    });
    
    console.log("Response:", response);
    const recipesText = response.choices[0]?.message?.content || "";
    console.log("Recipes Text:", recipesText);
    const recipes = parseRecipes(recipesText);
    console.log("Recipes:", recipes);
    return Response.json({ assistantId: assistant.id, recipes });
  } catch (error) {
    console.error("Error in recipes API:", error);
    return Response.json(
      { error: "Failed to generate recipes", details: error.message },
      { status: 500 }
    );
  }
}

function parseRecipes(text: string) {
  const recipes = [];
  const recipeSections = text.split("**Recipe");

  recipeSections.forEach((section, index) => {
    if (index === 0) return; // Skip the first split part as it will be empty
    const [nameLine, ...rest] = section.split("\n").filter(line => line.trim() !== "");
    const name = `Recipe${nameLine.trim()}`;
    const instructions = rest.join("\n").trim();
    recipes.push({ name, instructions });
  });

  return recipes;
}


