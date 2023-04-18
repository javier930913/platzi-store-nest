import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Hola Mundo+!";
  }

  @Get('nuevo')  // Without slashes 
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/') // With slashes 
  hello() {
    return 'con /sas/';
  }
}