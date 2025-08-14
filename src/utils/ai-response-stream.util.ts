import OpenAI from "openai";

export async function streamAiResponse(
  prompt: string,
  openaiClient: OpenAI,
  onChunk: (chunk: string) => void,
  model,
  systemPrompt?: {role:"system", content: string}
) {
  const stream = await openaiClient.chat.completions.create({
    model,
    messages: systemPrompt ? [systemPrompt,{ role: "user", content: prompt} ] : [ { role: "user", content: prompt }],
    stream: true,
  });

  for await (const part of stream) {
    const chunk = part.choices[0]?.delta?.content || "";
    if (chunk) {
      onChunk(chunk);
    }
  }
}
