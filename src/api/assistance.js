import openai from "../../utils/openai";
import fs from "fs";
import path from "path";

export async function getOrCreateAssistant() {
  try {
    const filePath = path.resolve("mydata.txt");
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    const existingAssistants = await openai.beta.assistants.list();
    let assistant = existingAssistants.data.find(
      (assistant) => assistant.name === "MealPrepper AI"
    );

    if (!assistant) {
      assistant = await openai.beta.assistants.create({
        name: "MealPrepper AI",
        instructions:
          "You are a personal meal planner. Depending on food expiration data, come up with recipes and ingredient lists.",
        model: "gpt-4o",
        tools: [{ type: "code_interpreter" }],
        file_ids: [file.id],
      });
    }
    
    console.log("Assistant is ready:", assistant.id);
    return assistant;
  } catch (error) {
    console.error("Error in assistant setup:", error);
    throw new Error("Failed to initialize assistant");
  }
}

