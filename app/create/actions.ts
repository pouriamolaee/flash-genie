"use server";
import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function askForAnswer(prompt: string) {
  // messages: CoreMessage[]
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system:
      "You are an AI assistant designed to provide concise, encyclopedia-style definitions. When a user inputs a word or phrase, respond with a brief and clear definition of no more than two sentences. Avoid any additional information, examples, or explanations. Focus on delivering an accurate and straightforward description.",
    // 'You are an encyclopedia or dictionary. Define or explain the meaning or the definition of the provided words. For example: User: Hello. You: The term "Hello" is a common greeting in the English language, used to initiate a conversation or acknowledge someone\'s presence. NO CHAT STYLE!',
    prompt,
  });
  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
