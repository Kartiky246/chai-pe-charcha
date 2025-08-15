import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from "@google/genai";
import OpenAI from 'openai';


@Injectable()
export class GeminiService {
    geminiInstance: OpenAI;
    constructor(private readonly configService: ConfigService){
        this.geminiInstance = new OpenAI({
            apiKey: this.configService.get('GEMINI_API_KEY'),
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
        })
    }

    get client(){
        return this.geminiInstance;
    }
}
