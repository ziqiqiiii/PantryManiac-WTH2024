import openai from "../../utils/openai";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const filePath = path.resolve("mydata.txt");
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    const existingAssistants = await openai.beta.assistants.list();
    const existingAssistant = existingAssistants.data.find(
      (assistant) => assistant.name === "MealPrepper AI"
    );

    if (existingAssistant) {
      return res.status(200).json({ message: "Assistant already exists", assistant: existingAssistant });
    }

    const assistant = await openai.beta.assistants.create({
      name: "MealPrepper AI",
      instructions:
        "You are a personal meal planner. Depending on food expiration data, come up with recipes and ingredient lists.",
      model: "gpt-4o",
      tools: [{ type: "code_interpreter" }],
      file_ids: [file.id],
    });

    return res.status(201).json({ message: "New assistant created", assistant });
  } catch (error) {
    console.error("Error in assistant API:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
