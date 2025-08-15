import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AiChatModule } from './ai-chat/ai-chat.module';
import { OpenAiModule } from './config/open-ai/open-ai.module';
import { GeminiModule } from './config/gemini/gemini.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AiChatModule, OpenAiModule, GeminiModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
