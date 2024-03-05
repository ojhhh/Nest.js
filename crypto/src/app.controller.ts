import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/link/:id')
  getId(
    @Param('id') id : string
  ) {
    return this.appService.encrypt(id);
  }
  
  @Get("/:text")
  getTextById(
    @Param('text') text : string
  ) {
    return this.appService.decrypt(text)
  }
  
}
