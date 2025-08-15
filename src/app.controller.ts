import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { personas } from './utils/ai-persona/persona';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(): string {
    return this.appService.getHealth();
  }

  @Get()
  getHome(@Res() res: Response) {
    return res.render('index', { 
    title: 'Chai pe charcha', 
    speakers: personas.map(v => ({
      name: v.name,
      avatar: v.avatar,
      specialties: v.specialties,
      bio: v.bio,
      title: v.title
    }))
  })
  }
  
}
