import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat-message-dto';
import type { Response } from 'express';
import { AiChatService } from './ai-chat.service';

@Controller('chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post()
  async sendMessage(@Res() res: Response, @Body() payload: ChatRequestDto, @Query('id') id: string) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    const {messages} = payload;
    await this.aiChatService.getAiChatStream(messages,(chunk)=>{
      res.write(`data: ${chunk}\n\n`);
    }, id);
    res.end();
  }
}
