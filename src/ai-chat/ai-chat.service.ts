import { Injectable } from '@nestjs/common';
import { streamAiResponse } from 'src/utils/ai-response-stream.util';
import { OpenAiService } from 'src/config/open-ai/open-ai.service';
import { GeminiService } from 'src/config/gemini/gemini/gemini.service';

enum AIModels{
    Gemini_Flash = 'gemini-2.5-flash',
    GPT_4O_MINI = 'gpt-4o-mini'
}

@Injectable()
export class AiChatService {
    constructor(private readonly openAiService: OpenAiService, private readonly geminiService: GeminiService){}

    getAiChatStream = async (message,  onChunk: (chunk: string) => void) =>{
        await streamAiResponse(message, this.geminiService.client, onChunk, AIModels.Gemini_Flash)
    }
}
