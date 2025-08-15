import OpenAI from "openai";
import { Role } from "src/ai-chat/dto/chat-message-dto";

export async function streamAiResponse(
  chatWithHistory: {role: Role, content: string} [],
  openaiClient: OpenAI,
  onChunk: (chunk: string) => void,
  model,
  systemPrompt?: {role: Role, content: string}
) {
  const stream = await openaiClient.chat.completions.create({
    model,
    messages: systemPrompt ? [systemPrompt, ...chatWithHistory] : chatWithHistory,
    stream: true,
  });

  for await (const part of stream) {
    const chunk = part.choices[0]?.delta?.content || "";
    if (chunk) {
      onChunk(chunk);
    }
  }
}
