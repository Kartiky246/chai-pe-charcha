import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
    openAiInstance: OpenAI;
    constructor(private configService: ConfigService){
        this.openAiInstance = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY')
        })
    }

    get client(){
        return this.openAiInstance;
    }
}
