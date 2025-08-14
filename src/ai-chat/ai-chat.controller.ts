import { Body, Controller, Post, Res } from '@nestjs/common';
import { ChatMessageDto } from './dto/chat-message-dto';
import type { Response } from 'express';
import { AiChatService } from './ai-chat.service';

@Controller('chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post()
  async sendMessage(@Res() res: Response, @Body() payload: ChatMessageDto) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    const {message} = payload;
    await this.aiChatService.getAiChatStream(message,(chunk)=>{
      res.write(`data: ${chunk}\n\n`);
    });
    res.end();
  }
}
