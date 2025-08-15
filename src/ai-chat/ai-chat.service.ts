import { Injectable } from '@nestjs/common';
import { streamAiResponse } from 'src/utils/ai-response-stream.util';
import { GeminiService } from 'src/config/gemini/gemini/gemini.service';
import { personas } from 'src/utils/ai-persona/persona';
import { generateSystemPrompt } from './helpers/peronsaSystemPrompt.helper';
// import { OpenAiService } from 'src/config/open-ai/open-ai.service';


enum AIModels{
    Gemini_Flash = 'gemini-2.5-flash',
    GPT_4O_MINI = 'gpt-4o-mini'
}

@Injectable()
export class AiChatService {
    constructor(private readonly geminiService: GeminiService){}

    getAiChatStream = async (messages,  onChunk: (chunk: string) => void, perosnId: string) =>{
        const personaSystemPrompt = generateSystemPrompt(personas.find(v=>v.id === perosnId)!)
        await streamAiResponse(messages, this.geminiService.client, onChunk, AIModels.Gemini_Flash, personaSystemPrompt)
    }
}
