import OpenAI from "openai";

export async function streamAiResponse(
  prompt: string,
  openaiClient: OpenAI,
  onChunk: (chunk: string) => void,
  model
) {
  const stream = await openaiClient.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  for await (const part of stream) {
    const chunk = part.choices[0]?.delta?.content || "";
    if (chunk) {
      onChunk(chunk);
    }
  }
}
