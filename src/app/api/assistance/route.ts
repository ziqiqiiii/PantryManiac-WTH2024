import openai from "../../../../utils/openai";

export async function getOrCreateAssistant() {
  try {
    const existingAssistants = await openai.beta.assistants.list({});
    let assistant = existingAssistants.data.find(
      (assistant) => assistant.name === "MealPrepper AI"
    );

    if (!assistant) {
      assistant = await openai.beta.assistants.create({
        name: "MealPrepper AI",
        instructions:
          "You are a personal meal planner. Depending on food expiration data, come up with recipes and ingredient lists.",
        model: "gpt-3.5-turbo",
        tools: [{ type: "code_interpreter" }],
      });
    }

    if (!assistant) {
      throw new Error("Assistant creation failed");
    }

    console.log("Assistant is ready:", assistant.id);
    return assistant;
  } catch (error) {
    console.error("Error in assistant setup:", error);
    throw new Error("Failed to initialize assistant");
  }
}


