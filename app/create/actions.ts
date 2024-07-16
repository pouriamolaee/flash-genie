"use server";
import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function askForAnswer(prompt: string) {
  // messages: CoreMessage[]
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system:
      "You are an AI assistant designed to provide concise, encyclopedia-style definitions. " +
      "When a user inputs a word or phrase, respond with a brief and clear definition of no more than two sentences. " +
      "Also provide two respective usage examples each in a new line.",
    // + "Avoid any additional information, examples, or explanations. Focus on delivering an accurate and straightforward description.",
    prompt,
  });
  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
